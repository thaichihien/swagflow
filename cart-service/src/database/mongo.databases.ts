import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from './database.interface';
import { IRepository } from './repository.inteface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCartRepository } from 'src/cart/repositories/cart.repository.mongo';
import { CartEntity } from 'src/cart/interfaces/cart-doc.interface';
import { Cart } from 'src/cart/schemas/cart.schema';

@Injectable()
export class MongoDatabases implements IDataServices, OnApplicationBootstrap {
  cart: IRepository<CartEntity>;

  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<Cart>,
  ) {}

  onApplicationBootstrap() {
    this.cart = new MongoCartRepository(this.cartModel);
  }
}
