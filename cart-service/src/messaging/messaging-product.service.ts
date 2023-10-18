import { Injectable } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { ProductDetailDto } from 'src/cart/dto/product-detail.dto';

@Injectable()
export class MessagingProductService extends MessagingService {
  PRODUCT_DETAIL_QUEUE = 'product-detail-queue';
  PRODUCTS_DETAIL_QUEUE = 'products-detail-queue';

  async getProductDetail(productId: string) {
    const response = await this.send<ProductDetailDto, string>(
      productId,
      this.PRODUCT_DETAIL_QUEUE,
    );

    return response;
  }

  async getAllProductDetail(productIds: string[]) {
    const response = await this.send<ProductDetailDto[], string[]>(
      productIds,
      this.PRODUCTS_DETAIL_QUEUE,
    );

    return response
  }
}
