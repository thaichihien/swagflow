import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ProductService } from './product-abstract.service';
import { ProductDetailDto } from 'src/cart/dto/product-detail.dto';
import { ProductServiceResponse } from './interfaces/product-response.interface';

@Injectable()
export class ProductHTTPClientService implements ProductService {
  async findAllByIds(ids: string[]): Promise<ProductDetailDto[]> {
    const queryParam = ids.map((id) => `ids=${id}`).join('&');

    try {
      const rawResponse = await fetch(
        `http://localhost:3002/api/v1/products?${queryParam}`,
      );

      const response: ProductServiceResponse = await rawResponse.json();

      if (!rawResponse.ok) {
        console.log(response);
        throw new ServiceUnavailableException('Failed to fetch products');
      }

      return response.data;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Failed to fetch products');
    }
  }
}
