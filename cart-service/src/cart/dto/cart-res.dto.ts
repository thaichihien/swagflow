import { CartItemResDto } from './cart-item-res.dto';

export class CartResDto {
  totalPrice: number;
  totalQuantity: number;
  items: CartItemResDto[];
}
