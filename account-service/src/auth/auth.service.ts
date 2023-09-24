import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/customer/customer.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayLoad } from './interfaces/jwt.payload';

@Injectable()
export class AuthService {
  private readonly ACCESS_EXPIRE_TIME = '1h';
  private readonly REFRESH_EXPIRE_TIME = '7d';
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly customerService: CustomerService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // - check exist
    const existedCustomer = await this.customerService.findOneByUsername(
      signUpDto.username,
      signUpDto.email,
    );

    if (existedCustomer) {
      throw new BadRequestException('Username or email is already existed');
    }
    // - hash password
    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;
    // - create account
    const newAccount = await this.customerService.create(signUpDto);

    // - generate tokens
    const tokens = await this.generateTokens(
      newAccount.id,
      newAccount.username,
    );

    // - update refresh token
    await this.updateRefreshToken(newAccount.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // - check exist
    const existedCustomer = await this.customerService.findOneByUsername(
      signInDto.username,
      signInDto.username,
    );

    if (!existedCustomer) {
      throw new BadRequestException('This username is not existed');
    }

    // - verify password
    if (!this.verifyPassword(signInDto.password, existedCustomer.password)) {
      throw new BadRequestException('The password is wrong');
    }

    // - generate tokens
    const tokens = await this.generateTokens(
      existedCustomer.id,
      existedCustomer.username,
    );

    // - update refresh tokens
    await this.updateRefreshToken(existedCustomer.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(
    id: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // - check exits and refresh token

    
    const existedCustomer = await this.customerService.findOneByID(id);

    if (!existedCustomer || !existedCustomer.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    // - verify refresh token
    if (!this.verifyPassword(refreshToken, existedCustomer.refreshToken)) {
      throw new ForbiddenException('Access denied');
    }

    // - generate tokens
    const tokens = await this.generateTokens(
      existedCustomer.id,
      existedCustomer.username,
    );

    // - update refresh tokens
    await this.updateRefreshToken(existedCustomer.id, tokens.refreshToken);
    return tokens;
  }

  async logout(id: string) {
    // - remove refresh token in db by switching to null
    await this.customerService.saveRefreshToken(id, null);
  }

  private async generateTokens(
    id: string,
    username: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayLoad = {
      sub: id,
      username: username,
      iss: 'KONG ISS',
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_SECRET'),
      expiresIn: this.ACCESS_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('REFRESH_SECRET'),
      expiresIn: this.REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    return bcryptPassword;
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const matched = await bcrypt.compare(password, hashedPassword);
    return matched;
  }

  private async updateRefreshToken(id: string, refreshToken: string) {
    //- hash refresh token
    const hashedRefreshToken = await this.hashPassword(refreshToken);
    //- save hashed refresh token in database
    await this.customerService.saveRefreshToken(id, hashedRefreshToken);
  }

  async verifyUser(token: string) {
    // - verify access token
    const payload: JwtPayLoad = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('ACCESS_SECRET'),
    });

    // - get account from id
    const user = await this.customerService.findOneByID(payload.sub);

    return user;
  }

  async decodeToken(token: string) {
    var payload = this.jwtService.decode(token);
    return payload;
  }
}
