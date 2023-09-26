import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"


@Schema({
    _id : false
})
export class CartItem{

    @Prop()
    productId : string

    @Prop()
    quantity: number
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem)
