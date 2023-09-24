import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AccessTokenStrategy } from 'src/auth/strategies/access-token.strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService,AccessTokenStrategy],
  exports: [CustomerService],
})
export class CustomerModule {}
