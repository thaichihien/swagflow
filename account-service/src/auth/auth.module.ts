import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { CookieTokenStrategy } from './strategies/cookie-token.strategy';

@Module({
  imports: [JwtModule.register({}), CustomerModule],
  controllers: [AuthController],
  providers: [AuthService, CookieTokenStrategy, AccessTokenStrategy],
  exports : [AuthService]
})
export class AuthModule {}
