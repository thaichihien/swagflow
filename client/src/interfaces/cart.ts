import { CartItem } from "./cart-item";

export interface Cart {
    items: CartItem[],
    totalPrice: 0,
}