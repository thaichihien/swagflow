import { Cart } from './schemas/cart.schema';

export const cartDB: Cart = new Cart({
  customerId: 'customer123',
  totalPrice: 100.0,
  items: [
    {
      productId: 'product1',
      quantity: 2,
    },
    {
      productId: 'product2',
      quantity: 1,
    },
  ],
});
