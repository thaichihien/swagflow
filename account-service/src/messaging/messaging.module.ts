import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory: async (configService : ConfigService) => {

          const exchangeName = configService.get("RABBIMQ_EXCHANGE");
          const user = configService.get('RABBITMQ_USER');
          const password = configService.get('RABBITMQ_PASSWORD');
          const host = configService.get('RABBITMQ_HOST');


          const config : RabbitMQConfig = {
            exchanges : [
              {
                name : exchangeName,
                type : 'topic'
              }
            ],
            uri: `amqp://${user}:${password}@${host}`, 
            enableControllerDiscovery : true
            //connectionInitOptions: { wait: false },
          }

          return config
      }
    }),
    AuthModule
  ],
  controllers: [MessagingController],
  providers: [MessagingService,MessagingController]
})
export class MessagingModule {}
