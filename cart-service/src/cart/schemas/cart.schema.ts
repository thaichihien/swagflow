import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CartItem } from "./cart-item.schema";
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
    timestamps: true
})
export class Cart extends Document{

    @Prop()
    customerId : string;


    @Prop([{ type: CartItem }])
    items : CartItem[]

}

export const CartSchema = SchemaFactory.createForClass(Cart)