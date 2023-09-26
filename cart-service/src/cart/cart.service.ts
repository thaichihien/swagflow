import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { IDataServices } from 'src/database/database.interface';
import { CartItem } from './schemas/cart-item.schema';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(private readonly dataServices: IDataServices) {}

  async create(createCartDto: CreateCartDto) {
    const created = await this.dataServices.cart.create(createCartDto);
    return created;
  }

  async findAll() {
    const all = await this.dataServices.cart.findAll();
    return all;
  }

  async findByCustomerId(id: string) {
    const one = await this.dataServices.cart.findOne({
      customerId: id,
    });

    if (one) {
      return one;
    } else {
      const createCartDto = new CreateCartDto();
      createCartDto.customerId = id;
      createCartDto.items = [];
      createCartDto.totalPrice = 0;
      const created = await this.dataServices.cart.create(createCartDto);
      return created;
    }
  }

  async findById(id: string) {
    return await this.dataServices.cart.findById(id);
  }

  async addItemToCart(productId: string, cartId: string) {
    // - find cart
    const cart = await this.dataServices.cart.findById(cartId);

    if (!cart) {
      throw new BadRequestException("cart with id doesn't existed");
    }

    // - find item in cart, if existed increase quantity else create new item and add to cart
    const existed = cart.items.find((i) => i.productId === productId);

    if (existed) {
      existed.quantity += 1;
    } else {
      const newCartItem = new CartItem();
      newCartItem.productId = productId;
      newCartItem.quantity = 1;
      cart.items.push(newCartItem);
    }

    cart.save();
    // - return cart

    return cart;
  }

  async changeItemQuantityInCart(
    productId: string,
    quantity: number,
    cartId: string,
  ) {
    const cart = await this.dataServices.cart.findById(cartId);

    if (!cart) {
      throw new BadRequestException("cart with id doesn't existed");
    }

    // - find item in cart, if existed increase quantity else create new item and add to cart
    const existed = cart.items.find((i) => i.productId === productId);

    if (existed) {
      existed.quantity = quantity;
    } else {
      const newCartItem = new CartItem();
      newCartItem.productId = productId;
      newCartItem.quantity = quantity;
      cart.items.push(newCartItem);
    }

    cart.save();
    // - return cart

    
    // - populate cart item from product service

    // - check item available


    return cart;
  }

  async removeFromCart(productId: string, cartId: string) {
    // - find cart
    const cart = await this.dataServices.cart.findById(cartId);

    if (!cart) {
      throw new BadRequestException("cart with id doesn't existed");
    }

    // - find item in cart, remove if existed or throw bad request
    const index = cart.items.findIndex((i) => i.productId === productId);

    if (index < 0) {
      throw new BadRequestException(
        "item with this is doesn't existed in cart",
      );
    }

    cart.items.splice(index, 1);

    // - save cart
    cart.save();

    // - return cart
    return cart;
  }
}
