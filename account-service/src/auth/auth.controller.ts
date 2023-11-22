import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { ApiTags } from '@nestjs/swagger';
import { CookieInterceptor } from 'src/common/interceptors/cookie.interceptor';
import { CookieTokenGuard } from 'src/common/guards/cookie-token.guard';
import { UserParam } from './dto/user-param.dto';
import { ClearCookieInterceptor } from 'src/common/interceptors/clear-cookie.interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ------------------------- Customer--------------
  @Post('sign-up')
  @UseInterceptors(CookieInterceptor)
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(200)
  @UseInterceptors(CookieInterceptor)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.signIn(signInDto);
  }

  @Get('log-out')
  @UseGuards(AccessTokenGuard)
  async logOut(@Req() req: Request) {
    const id = req.user['sub'];
    return await this.authService.logout(id);
  }

  @Get('refresh')
  @UseGuards(CookieTokenGuard)
  @UseInterceptors(CookieInterceptor)
  async refreshToken(@Req() req: Request) {
    const id = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refreshToken(id, refreshToken);
  }

  // ----------------------- Admin ------------------

  @Post('/:user/sign-up')
  @UseInterceptors(CookieInterceptor)
  async signUpUser(
    @Param() param: UserParam,
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (param.user === 'customer')
      return await this.authService.signUp(signUpDto);

    return await this.authService.signUpUser(signUpDto, param.user);
  }

  @Post('/:user/sign-in')
  @HttpCode(200)
  @UseInterceptors(CookieInterceptor)
  async signInUser(
    @Param() param: UserParam,
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (param.user === 'customer')
      return await this.authService.signIn(signInDto);

    return await this.authService.signInUser(signInDto);
  }

  @Get('/:user/log-out')
  @UseInterceptors(ClearCookieInterceptor)
  @UseGuards(AccessTokenGuard)
  async logOutUser(@Param() param: UserParam, @Req() req: Request) {
    const id = req.user['sub'];

    if (param.user === 'customer') return await this.authService.logout(id);

    return await this.authService.logoutUser(id);
  }

  @Get('/:user/refresh')
  @UseGuards(CookieTokenGuard)
  @UseInterceptors(CookieInterceptor)
  async refreshTokenUser(@Param() param: UserParam, @Req() req: Request) {
    const id = req.user['sub'];
    const refreshToken = req.user['refreshToken'];

    if (param.user === 'customer')
      return await this.authService.refreshToken(id, refreshToken);

    return await this.authService.refreshTokenUser(id, refreshToken);
  }

  @Get('decode/:token')
  async decodeToken(@Param('token') token: string) {
    return await this.authService.decodeToken(token);
  }
}
