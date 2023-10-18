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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Get('decode/:token')
  async decodeToken(@Param('token') token: string) {
    return await this.authService.decodeToken(token)
  }

}
