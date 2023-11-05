import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { CookieTokenStrategy } from './strategies/cookie-token.strategy';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [JwtModule.register({}), CustomerModule, UserModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService, CookieTokenStrategy, AccessTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
