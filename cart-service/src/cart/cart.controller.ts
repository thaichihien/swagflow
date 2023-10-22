import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Req, Session, UseInterceptors } from '@nestjs/common/decorators';
import { Request } from 'express';
import { CartSessionInterceptor } from 'src/common/interceptors/cart-session.interceptor';
import * as session from 'express-session';
import { CartResDto } from './dto/cart-res.dto';

@ApiTags('Cart')
@UseInterceptors(CartSessionInterceptor)
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // TODO test all 4 API

  @ApiOperation({ summary: 'Get or create a cart' })
  @Get()
  async findOrCreateByCustomerSession(
    @Session() sess: session.Session,
  ): Promise<CartResDto> {
    const cartId = sess['cart_id'];
    if (sess['anonymous']) {
      return await this.cartService.findCartSession(cartId);
    } else {
      const token = sess['user'];
      return await this.cartService.findCartForCustomer(token, cartId);
    }
  }

  @ApiOperation({ summary: 'Add a item to cart' })
  @Put('/items/:productId')
  async addProductToCart(
    @Param('productId') productId: string,
    @Session() sess: session.Session,
  ): Promise<CartResDto> {
    const cartId = sess['cart_id'];
    if (sess['anonymous']) {
      return await this.cartService.addItemToCartSession(productId, cartId);
    } else {
      const token = sess['user'];
      return await this.cartService.addItemToCart(productId, token);
    }
  }

  @ApiOperation({ summary: 'Remove a item from cart' })
  @Delete('/items/:productId')
  async removeProductToCart(
    @Param('productId') productId: string,
    @Session() sess: session.Session,
  ): Promise<CartResDto> {
    const cartId = sess['cart_id'];
    if (sess['anonymous']) {
      return await this.cartService.removeItemFromCartSession(productId, cartId);
    } else {
      const token = sess['user'];
      return await this.cartService.removeItemFromCart(productId, token);
    }
  }

  @Delete()
  async clearCart(@Session() sess: session.Session) {
    const cartId = sess['cart_id'];
    if (sess['anonymous']) {
      return await this.cartService.clearCartSession(cartId);
    } else {
      const token = sess['user'];
      return await this.cartService.clearCart(token);
    }
  }

  // --------------------------------------------

  @Get(':id')
  async getCartById(@Param('id') cartId: string) {
    return await this.cartService.findById(cartId);
  }

  @Get('all')
  findAll(@Req() req: Request) {
    return this.cartService.findAll();
  }
}
