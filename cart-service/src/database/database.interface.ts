import { Cart } from 'src/cart/schemas/cart.schema';
import { IRepository } from './repository.inteface';
import { CartItem } from 'src/cart/schemas/cart-item.schema';

export abstract class IDataServices {
  abstract cart: IRepository<Cart>;
}
