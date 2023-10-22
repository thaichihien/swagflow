import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { IDataServices } from 'src/database/database.interface';
import { Cart } from './schemas/cart.schema';
import { RedisClientType } from 'redis';
import { MessagingService } from 'src/messaging/messaging.service';
import { CartResDto } from './dto/cart-res.dto';
import { RabbitMQResponse } from 'src/messaging/dto/rabbitmq-response.dto';
import { ProductDetailDto } from './dto/product-detail.dto';
import { CartItemResDto } from './dto/cart-item-res.dto';
import {
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomerProfileFullDto } from './dto/customer-profile-full.dto';
import {
  Document,
  Model,
  DocumentSetOptions,
  QueryOptions,
  UpdateQuery,
  AnyObject,
  PopulateOptions,
  MergeType,
  Query,
  SaveOptions,
  ToObjectOptions,
  FlattenMaps,
  Require_id,
  UpdateWithAggregationPipeline,
  pathsToSkip,
  Error,
} from 'mongoose';
import { CartEntity } from './interfaces/cart-doc.interface';
import { REDIS_SERVICE } from 'src/redis/redis.module';

describe('CartService', () => {
  let service: CartService;
  let redisService: RedisClientType;
  let messagingService: MessagingService;
  let dataServices: IDataServices;

  const mockIDataServices: IDataServices = {
    cart: {
      create: jest.fn(),
      findById: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  const mockMessageService = {
    send: jest.fn(),
  };
  const mockRedis = {
    hGetAll: jest.fn(),
    hGet: jest.fn(),
    hIncrBy: jest.fn(),
    hDel: jest.fn(),
  };
  const cartRedis = {
    '12210375-7327-45f1-8cf3-8e09443bde35': '1',
    '13e18047-f27d-4031-91f0-7a1763165c08': '2',
  };
  const productDetailSuccessResponse: RabbitMQResponse<ProductDetailDto[]> = {
    success: true,
    message: 'get all product details successfully',
    data: [
      {
        id: '12210375-7327-45f1-8cf3-8e09443bde35',
        name: 'Nsw Bomber',
        price: 138.54,
        category: 'Jackets',
        brand: 'Nike',
        images: [],
        description:
          'Color: black\nManufacturer color: black/black/white\nMaterial composition: 100% Polyester',
      },
      {
        id: '13e18047-f27d-4031-91f0-7a1763165c08',
        name: 'Levis Eastport Utility Parka',
        price: 241.99,
        category: 'Jackets',
        brand: "Levi's",
        images: [],
        description:
          'Color: green\nManufacturer color: ponderosa pine\nMaterial composition: 54% Cotton, 46% Polyester',
      },
    ],
  };
  const productDetailFailResponse: RabbitMQResponse<ProductDetailDto[]> = {
    success: false,
    message: 'error at product-service',
    data: undefined,
  };
  const customerProfileSuccessResponse: RabbitMQResponse<CustomerProfileFullDto> =
    {
      success: true,
      message: 'get profile successfully',
      data: {
        id: 'customer-id',
      },
    };
  const customerProfileFailResponse: RabbitMQResponse<CustomerProfileFullDto> =
    {
      success: false,
      message: 'invalid token',
      data: null,
    };

  const cartResponse: CartResDto = {
    totalPrice: 0,
    items: [
      {
        product: {
          id: '12210375-7327-45f1-8cf3-8e09443bde35',
          name: 'Nsw Bomber',
          price: 138.54,
          category: 'Jackets',
          brand: 'Nike',
          images: [],
          description:
            'Color: black\nManufacturer color: black/black/white\nMaterial composition: 100% Polyester',
        },
        quantity: 1,
      },
      {
        product: {
          id: '13e18047-f27d-4031-91f0-7a1763165c08',
          name: 'Levis Eastport Utility Parka',
          price: 241.99,
          category: 'Jackets',
          brand: "Levi's",
          images: [],
          description:
            'Color: green\nManufacturer color: ponderosa pine\nMaterial composition: 54% Cotton, 46% Polyester',
        },
        quantity: 2,
      },
    ],
  };
  const cartId = 'cart-test-id';
  const customerToken = 'customer-token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: IDataServices,
          useValue: mockIDataServices,
        },
        {
          provide: REDIS_SERVICE,
          useValue: mockRedis,
        },
        {
          provide: MessagingService,
          useValue: mockMessageService,
        },
      ],
    }).compile();

    dataServices = module.get<IDataServices>(IDataServices);
    messagingService = module.get<MessagingService>(MessagingService);
    redisService = module.get<RedisClientType>(REDIS_SERVICE);
    service = module.get<CartService>(CartService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findCartSession', () => {
    it('should return a empty cart for the first time request', async () => {
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(undefined);

      const cart = await service.findCartSession(cartId);

      expect(cart.items.length).toEqual(0);
      expect(cart.totalPrice).toEqual(0);
    });

    it('should return a cart for the session cart id', async () => {
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(cartRedis);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailSuccessResponse);

      const cart = await service.findCartSession(cartId);

      expect(cart.items.length).toEqual(2);
      expect(cart.items).toEqual(cartResponse.items);
      expect(cart.totalPrice).toEqual(0);
    });

    it('should throw an InternalServerErrorException if there is an error from product-service', async () => {
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(cartRedis);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailFailResponse);

      await expect(service.findCartSession(cartId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
  describe('addItemToCartSession', () => {
    it('should return cart after add an item successfully', async () => {
      jest.spyOn(redisService, 'hGet').mockResolvedValue('0');
      jest.spyOn(redisService, 'hIncrBy').mockResolvedValue(1);
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(cartRedis);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailSuccessResponse);

      const cart = await service.addItemToCartSession(cartRedis[0], cartId);

      expect(redisService.hIncrBy).toHaveBeenCalled();
      expect(cart.items.length).toEqual(2);
    });
  });
  describe('removeItemFromCartSession', () => {
    it('should return cart after remove an item successfully', async () => {
      jest.spyOn(redisService, 'hDel').mockResolvedValue(1);
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(cartRedis);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailSuccessResponse);

      const cart = await service.removeItemFromCartSession(
        cartRedis[0],
        cartId,
      );

      expect(redisService.hDel).toHaveBeenCalled();
    });
  });
  describe('clearCartSession', () => {
    it('should call hGetAll and hDel of redisService when call clearCartSession', async () => {
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(cartRedis);
      jest.spyOn(redisService, 'hDel').mockResolvedValue(0);

      await service.clearCartSession(cartId);

      expect(redisService.hGetAll).toHaveBeenCalled();
      expect(redisService.hDel).toHaveBeenCalledTimes(2);
    });
  });
  describe('findCartForCustomer', () => {
    const newCartDB: CartEntity = {
      id: 'cart-id',
      customerId: 'customer-id',
      totalPrice: 0,
      items: [],
    };

    it('should return a cart merged with the shopping cart when the customer is not authenticated (session cart)', async () => {
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(customerProfileSuccessResponse);
      jest.spyOn(dataServices.cart, 'findOne').mockResolvedValue(null);
      jest.spyOn(dataServices.cart, 'create').mockResolvedValue(newCartDB);
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(cartRedis);
      jest.spyOn(redisService, 'hDel').mockResolvedValue(0);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailSuccessResponse);

      const cart = await service.findCartForCustomer(customerToken, cartId);

      expect(cart.items.length).toEqual(2);
      expect(messagingService.send).toHaveBeenCalledWith(
        customerToken,
        messagingService.ACCOUNT_QUEUE,
      );
      expect(dataServices.cart.findOne).toHaveBeenCalled();
    });

    it('should throw a ForbiddenException if the token is invalid', async () => {
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(customerProfileFailResponse);

      await expect(
        service.findCartForCustomer(customerToken, cartId),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should not merge carts if the cart from the authenticated customer and the cart is already merged', async () => {
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(customerProfileSuccessResponse);
      jest.spyOn(dataServices.cart, 'findOne').mockResolvedValue(newCartDB);
      //jest.spyOn(dataServices.cart, 'create').mockResolvedValue(newCartDB);
      jest.spyOn(redisService, 'hGetAll').mockResolvedValue(undefined);
      //jest.spyOn(redisService, 'hDel').mockResolvedValue(0);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailSuccessResponse);

      const cart = await service.findCartForCustomer(customerToken, cartId);

      expect(cart.items.length).toEqual(2);
      expect(messagingService.send).toHaveBeenCalledWith(
        customerToken,
        messagingService.ACCOUNT_QUEUE,
      );
      expect(dataServices.cart.findOne).toHaveBeenCalled();
      expect(redisService.hDel).not.toHaveBeenCalled();
    });
  });
  describe('addItemToCart', () => {
    const cartDB: CartEntity = {
      id: 'cart-id',
      customerId: 'customer-id',
      totalPrice: 0,
      items: [
        {
          productId: '12210375-7327-45f1-8cf3-8e09443bde35',
          quantity: 1,
        },
        {
          productId: '13e18047-f27d-4031-91f0-7a1763165c08',
          quantity: 2,
        },
      ],
    };
    const oldCartDB: CartEntity = {
      id: 'cart-id',
      customerId: 'customer-id',
      totalPrice: 0,
      items: [
        {
          productId: '12210375-7327-45f1-8cf3-8e09443bde35',
          quantity: 1,
        },
        {
          productId: '13e18047-f27d-4031-91f0-7a1763165c08',
          quantity: 2,
        },
      ],
    };
    const productDetailSuccessResponseWithNewItem: RabbitMQResponse<ProductDetailDto[]> = {
      success: true,
      message: 'get all product details successfully',
      data: [
        {
          id: '12210375-7327-45f1-8cf3-8e09443bde35',
          name: 'Nsw Bomber',
          price: 138.54,
          category: 'Jackets',
          brand: 'Nike',
          images: [],
          description:
            'Color: black\nManufacturer color: black/black/white\nMaterial composition: 100% Polyester',
        },
        {
          id: '13e18047-f27d-4031-91f0-7a1763165c08',
          name: 'Levis Eastport Utility Parka',
          price: 241.99,
          category: 'Jackets',
          brand: "Levi's",
          images: [],
          description:
            'Color: green\nManufacturer color: ponderosa pine\nMaterial composition: 54% Cotton, 46% Polyester',
        },
        {
          id: 'new-product-id',
          name: 'Levis Eastport Utility Parka',
          price: 241.99,
          category: 'Jackets',
          brand: "Levi's",
          images: [],
          description:
            'Color: green\nManufacturer color: ponderosa pine\nMaterial composition: 54% Cotton, 46% Polyester',
        },
      ],
    };

    it('should return cart with new lenghth if adding an new item to cart successfully', async () => {
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(customerProfileSuccessResponse);
      jest.spyOn(dataServices.cart, 'findOne').mockResolvedValue(cartDB);
      jest.spyOn(dataServices.cart, 'update').mockResolvedValue(cartDB);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailSuccessResponseWithNewItem);
      const newProductId = 'new-product-id';

      const newCart = await service.addItemToCart(newProductId, customerToken);

      expect(newCart.items.length).toEqual(oldCartDB.items.length + 1);
      expect(dataServices.cart.update).toHaveBeenCalled();
    });

    it('should return cart with a product with quantity increased by one if adding an existing item to cart successfully', async () => {
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(customerProfileSuccessResponse);
      jest.spyOn(dataServices.cart, 'findOne').mockResolvedValue(cartDB);
      jest.spyOn(dataServices.cart, 'update').mockResolvedValue(cartDB);
      jest
        .spyOn(messagingService, 'send')
        .mockResolvedValue(productDetailSuccessResponse);
      const oldProduct = oldCartDB.items[0];

      const newCart = await service.addItemToCart(
        oldProduct.productId,
        customerToken,
      );

      expect(newCart.items.length).toEqual(oldCartDB.items.length);
      expect(
        newCart.items.find((p) => p.product.id == oldProduct.productId)
          .quantity,
      ).toEqual(oldProduct.quantity + 1);
      expect(dataServices.cart.update).toHaveBeenCalled();
    });
  });
  // describe('removeItemFromCart', () => {});
  // describe('clearCart', () => {});
});
