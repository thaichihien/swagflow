import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [JwtModule.register({}), CustomerModule],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
})
export class AuthModule {}
