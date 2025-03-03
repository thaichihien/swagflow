import { Module } from '@nestjs/common';
import { ProductHTTPClientService } from './product-http-client.service';
import { ProductService } from './product-abstract.service';

@Module({
  providers: [
    {
      provide: ProductService,
      useClass: ProductHTTPClientService,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
