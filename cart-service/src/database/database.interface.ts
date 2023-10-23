

import { CartEntity } from 'src/cart/enities/cart.enity';
import { IRepository } from './repository.inteface';
import { CartItem } from 'src/cart/schemas/cart-item.schema';

export abstract class IDataServices {
  abstract cart: IRepository<CartEntity>;
}
