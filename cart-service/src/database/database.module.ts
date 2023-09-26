import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/cart/schemas/cart.schema';
import { IDataServices } from './database.interface';
import { MongoDatabases } from './mongo.databases';

// way to change database
// - 1 implement IRepository for suitable database
// - 2 Create database class provider with suitable database
// - 3 import dependecies for database class provider
// - 4 change database class name in providers

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
    
    ]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDatabases,
    },
  ],
  exports: [IDataServices],
})
export class DatabaseModule {}
