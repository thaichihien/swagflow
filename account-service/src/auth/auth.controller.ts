import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Get('log-out')
  @UseGuards(AccessTokenGuard)
  async logOut(@Req() req: Request) {
    const id = req.user['sub'];
    return await this.authService.logout(id);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Req() req: Request) {
    const id = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refreshToken(id, refreshToken);
  }
}
