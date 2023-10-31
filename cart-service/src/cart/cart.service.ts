import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { IDataServices } from 'src/database/database.interface';
import { CartItem } from './schemas/cart-item.schema';
import { REDIS_SERVICE } from 'src/redis/redis.module';
import { RedisClientType } from 'redis';
import { CartResDto } from './dto/cart-res.dto';
import { CartItemResDto } from './dto/cart-item-res.dto';
import { Cart } from './schemas/cart.schema';
import { CustomerProfileFullDto } from './dto/customer-profile-full.dto';
import { MessagingService } from 'src/messaging/messaging.service';
import { ProductDetailDto } from './dto/product-detail.dto';
import { CartEntity } from './enities/cart.enity';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(
    private readonly dataServices: IDataServices,
    @Inject(REDIS_SERVICE)
    private readonly redisService: RedisClientType,
    private readonly messagingService: MessagingService,
  ) {}

  //-----------Redis Session------------------

  async findCartSession(cartId: string) {
    const cartResponse: CartResDto = {
      totalPrice: 0,
      totalQuantity : 0,
      items: [],
    };
    const cart = await this.redisService.hGetAll(this.getCartKey(cartId));

    if (!cart) {
      return cartResponse;
    }

    // -- get product detail list from product service
    const response = await this.messagingService.send<
      ProductDetailDto[],
      string[]
    >(
      Object.keys(cart).map((item) => {
        return item.split('#')[0];
      }),
      this.messagingService.PRODUCTS_DETAIL_QUEUE,
    );

    if (!response.success) {
      this.logger.error(response.message);
      throw new InternalServerErrorException('communication error');
    }

    const productMap = new Map<string, ProductDetailDto>(
      response.data.map((item) => [item.id, item]),
    );

    let totalPrice = 0;
    let totalQuantity = 0
    // for (const product of response.data) {
    //   const item: CartItemResDto = {
    //     product: product,
    //     quantity: +cart[product.id],
    //   };

    //   totalPrice += item.product.price * item.quantity;
    //   cartResponse.items.push(item);
    // }
    for (const productIdSize of Object.keys(cart)) {
      const p = productIdSize.split('#');
      const item: CartItemResDto = {
        product: productMap.get(p[0]),
        quantity: +cart[productIdSize],
        selectedSize: p[1],
      };

      totalQuantity += item.quantity
      totalPrice += item.product.price * item.quantity;
      cartResponse.items.push(item);
    }
    // TODO calculate price
    cartResponse.totalPrice = +totalPrice.toFixed(2);
    cartResponse.totalQuantity = totalQuantity

    return cartResponse;
  }

  async addItemToCartSession(productId: string, size: string, cartId: string) {
    // TODO reduce stock

    const quantityInCart =
      (await this.redisService.hGet(
        this.getCartKey(cartId),
        this.getProductKey(productId, size),
      )) || '0';

    // -- check product stock before add to cart
    await this.redisService.hIncrBy(
      this.getCartKey(cartId),
      this.getProductKey(productId, size),
      1,
    );

    return this.findCartSession(cartId);
  }

  async removeItemFromCartSession(
    productId: string,
    size: string,
    cartId: string,
  ) {
    // TODO increase stock

    await this.redisService.hDel(
      this.getCartKey(cartId),
      this.getProductKey(productId, size),
    );

    return this.findCartSession(cartId);
  }

  async clearCartSession(cartId: string) {
    const cart = await this.redisService.hGetAll(this.getCartKey(cartId));

    if (!cart) {
      return;
    }

    for (const productIdSize of Object.keys(cart)) {
      await this.redisService.hDel(this.getCartKey(cartId), productIdSize);

      // TODO increase stock
    }
  }

  getCartKey(cardId: string): string {
    return `cart:${cardId}`;
  }

  getProductKey(productId: string, size: string): string {
    return `${productId}#${size}`;
  }

  // -------------------------------------------

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

  async addItemToCart(productId: string, size: string, token: string) {
    // - find cart

    const customer = await this.getCustomerInfo(token);

    const cart = await this.findByCustomerId(customer.id);

    if (!cart) {
      throw new BadRequestException("cart with id doesn't existed");
    }

    // - find item in cart, if existed increase quantity else create new item and add to cart
    const existed = cart.items.find(
      (i) => i.productSizeId === this.getProductKey(productId, size),
    );

    if (existed) {
      existed.quantity += 1;
    } else {
      const newCartItem = new CartItem();
      newCartItem.productSizeId = this.getProductKey(productId, size);
      newCartItem.quantity = 1;
      cart.items.push(newCartItem);
    }

    await this.dataServices.cart.update(cart.id, cart);
    // - return cart

    return await this.mapToCartResDto(cart);
  }

  // ! NOT USING NOW
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
    const existed = cart.items.find((i) => i.productSizeId === productId);

    if (existed) {
      existed.quantity = quantity;
    } else {
      const newCartItem = new CartItem();
      newCartItem.productSizeId = productId;
      newCartItem.quantity = quantity;
      cart.items.push(newCartItem);
    }

    await this.dataServices.cart.update(cart.id, cart);

    return cart;
  }

  async removeItemFromCart(productId: string, size: string, token: string) {
    // - find cart
    const customer = await this.getCustomerInfo(token);

    const cart = await this.findByCustomerId(customer.id);

    if (!cart) {
      throw new BadRequestException("cart with id doesn't existed");
    }

    // - find item in cart, remove if existed or throw bad request
    const index = cart.items.findIndex(
      (i) => i.productSizeId === this.getProductKey(productId, size),
    );

    if (index < 0) {
      throw new BadRequestException(
        "item with this is doesn't existed in cart",
      );
    }

    cart.items.splice(index, 1);

    // - save cart
    await this.dataServices.cart.update(cart.id, cart);

    // - return cart
    return await this.mapToCartResDto(cart);
  }

  async clearCart(token: string) {
    const customer = await this.getCustomerInfo(token);

    const cart = await this.findByCustomerId(customer.id);

    cart.items = [];
    await this.dataServices.cart.update(cart.id, cart);
  }

  async getCustomerInfo(token: string): Promise<CustomerProfileFullDto> {
    const response = await this.messagingService.send<
      CustomerProfileFullDto,
      string
    >(token, this.messagingService.ACCOUNT_QUEUE);
    if (!response.success) {
      this.logger.error(response.message);
      return null;
    }

    return response.data;
  }

  async findCartForCustomer(
    token: string,
    cartIdSession: string,
  ): Promise<CartResDto> {
    // - valid token from account-service (get customer id)
    const customer = await this.getCustomerInfo(token);

    // ! If invalid token throw Forbidden
    if (!customer) {
      throw new ForbiddenException('invalid token');
    }

    // console.log(customer.id)

    // - findByCustomerId(id)
    const cart = await this.findByCustomerId(customer.id);

    //console.log(cart);
    // - merge items from cart in redux (anonymouse) to cart in mongodb (authenticated) (if existed)
    const mergedCart = await this.mergeGuestCart(cartIdSession, cart);

    //console.log(mergedCart);

    if (mergedCart) {
      return await this.mapToCartResDto(mergedCart);
    }
    // - return cart
    return await this.mapToCartResDto(cart);
  }

  async mergeGuestCart(fromCartId: string, cartDB: CartEntity) {
    if (!fromCartId || !cartDB) {
      return null;
    }

    const cartSession = await this.redisService.hGetAll(
      this.getCartKey(fromCartId),
    );
    if (!cartSession) {
      return null;
    }

    for (const productIdSize of Object.keys(cartSession)) {
      // - find item in cart, if existed increase quantity else create new item and add to cart
      const productId = productIdSize.split('#')[0];
      const size = productIdSize.split('#')[1];
      const existed = cartDB.items.find(
        (i) => i.productSizeId === productIdSize,
      );

      if (existed) {
        existed.quantity += +cartSession[productIdSize];
      } else {
        const newCartItem = new CartItem();
        newCartItem.productSizeId = productIdSize;
        newCartItem.quantity = +cartSession[productIdSize];
        cartDB.items.push(newCartItem);
      }

      await this.dataServices.cart.update(cartDB.id, cartDB);
      await this.redisService.hDel(this.getCartKey(fromCartId), productIdSize);
    }

    return cartDB;
  }

  async mapToCartResDto(cart: CartEntity) {
    const cartResponse: CartResDto = {
      totalPrice: 0,
      items: [],
      totalQuantity : 0
    };

    const response = await this.messagingService.send<
      ProductDetailDto[],
      string[]
    >(
      cart.items.map((cartItem) => cartItem.productSizeId.split('#')[0]),
      this.messagingService.PRODUCTS_DETAIL_QUEUE,
    );

    if (!response.success) {
      this.logger.error(response.message);
      throw new InternalServerErrorException('communication error');
    }

    const productMap = new Map<string, ProductDetailDto>(
      response.data.map((item) => [item.id, item]),
    );

    let totalPrice = 0;
    let totalQuantity = 0;
   
   

    for (const cartItem of cart.items) {
      //console.log(productMap.get(cartItem.productSizeId.split('#')[0]))
      const item: CartItemResDto = {
        product: productMap.get(cartItem.productSizeId.split('#')[0]),
        quantity: cartItem.quantity,
        selectedSize: cartItem.productSizeId.split('#')[1],
      };

      totalQuantity += item.quantity
      totalPrice += item.product.price * item.quantity;
      cartResponse.items.push(item);
    }
    cartResponse.totalPrice = +totalPrice.toFixed(2);
    cartResponse.totalQuantity = totalQuantity

    return cartResponse;
  }
}
