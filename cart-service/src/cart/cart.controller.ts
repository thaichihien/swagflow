import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { QueryRequired } from 'src/utils/decorators/query-required.decorator';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common/decorators';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/customer/:id')
  async findOrCreateByCustomerId(@Param('id') id: string) {
    return await this.cartService.findByCustomerId(id);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }
  
  @ApiQuery({
    name: 'product',
    description: 'product id',
  })
  @Put(':id')
  async addItemToCart(
    @Param('id') cartId: string,
    @QueryRequired('product') productId: string,
  ) {
    return await this.cartService.addItemToCart(productId, cartId);
  }

  @ApiQuery({
    name: 'product',
    description: 'product id',
  })
  @Delete(':id')
  async removeItemFromCart(
    @Param('id') cartId: string,
    @QueryRequired('product') productId: string,
  ) {
    return await this.cartService.removeFromCart(productId, cartId);
  }
}
