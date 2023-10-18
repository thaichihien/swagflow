import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RedisModule } from 'src/redis/redis.module';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [DatabaseModule, RedisModule, MessagingModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
