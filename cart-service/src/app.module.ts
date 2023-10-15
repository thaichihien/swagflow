import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {RedisClientType } from 'redis'
import  RedisStore from 'connect-redis'
import { REDIS_SERVICE, RedisModule } from './redis/redis.module';
import session from 'express-session';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CartModule,
    DatabaseModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS_SERVICE)
    private readonly redis : RedisClientType,
    private readonly configService: ConfigService
  ){}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      session({
        store : new RedisStore({
          client : this.redis
        }),
        saveUninitialized : false,
        secret : this.configService.get("SESSION_SECRET"),
        resave : false,
        cookie : {
          sameSite : true,
          httpOnly : true,
          maxAge : 86400000 * 2
        }
      })
    ).forRoutes('*')
  }
}
