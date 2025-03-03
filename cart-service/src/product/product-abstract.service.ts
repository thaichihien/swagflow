import { ProductDetailDto } from 'src/cart/dto/product-detail.dto';

export abstract class ProductService {
  abstract findAllByIds(
    ids: string[],
  ): Promise<ProductDetailDto[]> | ProductDetailDto[];
}
