import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Redis from 'redis';

export const REDIS_SERVICE = 'REDIS';

@Module({
  
  providers: [
    {
      
      inject: [ConfigService],
      provide: REDIS_SERVICE,
      useFactory: async (configService: ConfigService) => {
        //const username = configService.get('REDIS_USERNAME');
        const password = configService.get('REDIS_PASSWORD');
        const redisUrl = configService.get('REDIS_URL');

        const client = Redis.createClient({
          url: `redis://:${password}@${redisUrl}`,
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS_SERVICE],
})
export class RedisModule {}
