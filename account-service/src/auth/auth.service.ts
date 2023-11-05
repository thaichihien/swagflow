import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayLoad } from './interfaces/jwt.payload';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/entities/user.entity';
import { Customer } from 'src/customer/enity/customer.enity';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { CustomerProfileDto } from 'src/customer/dto/customer-profile.dto';
import { CustomerProfileFullDto } from 'src/customer/dto/customer-profile-full.dto';

@Injectable()
export class AuthService {
  private readonly ACCESS_EXPIRE_TIME = '1h';
  private readonly REFRESH_EXPIRE_TIME = '7d';
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly customerService: CustomerService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existedCustomer = await this.customerService.findOneByEmail(
      signUpDto.email,
    );

    if (existedCustomer) {
      throw new BadRequestException('Username or email is already existed');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;

    const newAccount = await this.customerService.create(signUpDto);

    const tokens = await this.generateTokens(newAccount.id, newAccount.email);

    await this.updateRefreshToken(newAccount.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existedCustomer = await this.customerService.findOneByEmail(
      signInDto.email,
    );

    if (!existedCustomer) {
      throw new BadRequestException('This username is not existed');
    }

    if (
      !(await this.verifyPassword(signInDto.password, existedCustomer.password))
    ) {
      throw new BadRequestException('The password is wrong');
    }

    const tokens = await this.generateTokens(
      existedCustomer.id,
      existedCustomer.email,
    );

    await this.updateRefreshToken(existedCustomer.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken(
    id: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existedCustomer = await this.customerService.findOneByID(id);

    if (!existedCustomer || !existedCustomer.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    if (
      !(await this.verifyPassword(refreshToken, existedCustomer.refreshToken))
    ) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.generateTokens(
      existedCustomer.id,
      existedCustomer.email,
    );

    await this.updateRefreshToken(existedCustomer.id, tokens.refreshToken);
    return tokens;
  }

  async logout(id: string) {
    await this.customerService.saveRefreshToken(id, null);
  }

  // --------------------------- Admin-----------------

  async signUpUser(
    signUpDto: SignUpDto,
    roleName: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // - check exist
    const existedUser = await this.userService.findOneByEmail(signUpDto.email);

    if (existedUser) {
      throw new BadRequestException('Username or email is already existed');
    }

    // if (roleName === 'admin') {
    //   const adminRole = await this.roleService.findRoleByNameWithUsers('admin');

    //   if (adminRole.user.length > 1) {
    //     throw new BadRequestException('Admin account is already existed');
    //   }
    // }

    // - hash password
    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;

    const role = await this.roleService.findByNameOrCreated(roleName);

    // - create account
    const newAccount = await this.userService.create({ ...signUpDto });

    await this.userService.addRole(newAccount.id, role.id);

    // - generate tokens
    const tokens = await this.generateTokens(
      newAccount.id,
      newAccount.email,
      newAccount.roles,
    );

    // - update refresh token
    await this.updateUserRefreshToken(newAccount.id, tokens.refreshToken);

    return tokens;
  }

  async signInUser(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // - check exist
    const existedCustomer = await this.userService.findOneByEmail(
      signInDto.email,
    );

    if (!existedCustomer) {
      throw new BadRequestException('This username is not existed');
    }

    // - verify password
    if (
      !(await this.verifyPassword(signInDto.password, existedCustomer.password))
    ) {
      throw new BadRequestException('The password is wrong');
    }

    const userRoles = await this.userService.findUserRole(existedCustomer.id);

    // - generate tokens
    const tokens = await this.generateTokens(
      existedCustomer.id,
      existedCustomer.email,
      userRoles,
    );

    // - update refresh tokens
    await this.updateUserRefreshToken(existedCustomer.id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokenUser(
    id: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // - check exits and refresh token

    const existedUser = await this.userService.findById(id);

    if (!existedUser || !existedUser.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    // - verify refresh token
    if (!(await this.verifyPassword(refreshToken, existedUser.refreshToken))) {
      throw new ForbiddenException('Access denied');
    }

    const roles = await this.userService.findUserRole(existedUser.id);

    // - generate tokens
    const tokens = await this.generateTokens(
      existedUser.id,
      existedUser.email,
      roles,
    );

    // - update refresh tokens
    await this.updateUserRefreshToken(existedUser.id, tokens.refreshToken);
    return tokens;
  }

  async logoutUser(id: string) {
    // - remove refresh token in db by switching to null
    await this.userService.saveRefreshToken(id, null);
  }

  private async generateTokens(
    id: string,
    username: string,
    roles?: string[],
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayLoad = {
      sub: id,
      username: username,
      iss: this.configService.get<string>('ISS_KEY'),
      roles: roles ?? [],
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

  private async updateUserRefreshToken(id: string, refreshToken: string) {
    //- hash refresh token
    const hashedRefreshToken = await this.hashPassword(refreshToken);
    //- save hashed refresh token in database
    await this.userService.saveRefreshToken(id, hashedRefreshToken);
  }

  async verifyUser(
    token: string
  ): Promise<CustomerProfileFullDto | UserResponseDto | null> {
    try {
      const payload: JwtPayLoad = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_SECRET'),
      });

      if (payload.roles.length === 0) {
        return await this.customerService.findOneByID(payload.sub);
      } else {
        const user = await this.userService.findById(payload.sub);
        return await this.userService.convertToResponse(user);
      }
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }

  async decodeToken(token: string) {
    const payload: JwtPayLoad = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('ACCESS_SECRET'),
    });
    return payload;
  }
}
