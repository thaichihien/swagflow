import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
            connectionManagerOptions : {
              connectionOptions : {
                timeout : 10000
              }
            },
            //enableControllerDiscovery : true,
            //connectionInitOptions: { wait: false },
          }

          return config
      }
    })
  ],
  controllers: [MessagingController],
  providers: [MessagingService],
  exports: [MessagingService]
})
export class MessagingModule {}
