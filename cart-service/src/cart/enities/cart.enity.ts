import { Document } from 'mongoose';
import { CartItem } from '../schemas/cart-item.schema';

export class CartEntity {
  id: string;
  customerId: string;

  items: CartItem[];
}