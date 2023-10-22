

import { CartEntity } from 'src/cart/interfaces/cart-doc.interface';
import { IRepository } from './repository.inteface';
import { CartItem } from 'src/cart/schemas/cart-item.schema';

export abstract class IDataServices {
  abstract cart: IRepository<CartEntity>;
}
