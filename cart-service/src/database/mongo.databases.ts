import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from './database.interface';
import { Cart } from 'src/cart/schemas/cart.schema';
import { IRepository } from './repository.inteface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCartRepository } from 'src/cart/repositories/cart.repository.mongo';

@Injectable()
export class MongoDatabases implements IDataServices, OnApplicationBootstrap {
  cart: IRepository<Cart>;

  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<Cart>,
  ) {}

  onApplicationBootstrap() {
    this.cart = new MongoCartRepository(this.cartModel);
  }
}
