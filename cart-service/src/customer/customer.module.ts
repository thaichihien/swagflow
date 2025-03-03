import { Module } from '@nestjs/common';
import { CustomerService } from './interfaces/customer.service';
import { CustomerHttpClientService } from './customer-http-client.service';

@Module({
  providers: [
    {
      provide: CustomerService,
      useClass: CustomerHttpClientService,
    },
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
