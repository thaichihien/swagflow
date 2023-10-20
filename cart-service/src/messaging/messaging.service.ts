import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQResponse } from './dto/rabbitmq-response.dto';

@Injectable()
export class MessagingService {
  protected EXCHANGE_NAME: string;
  readonly PRODUCT_DETAIL_QUEUE = 'product-detail-queue';
  readonly PRODUCTS_DETAIL_QUEUE = 'products-detail-queue';
  readonly ACCOUNT_QUEUE = 'account-queue'


  private readonly logger = new Logger(MessagingService.name);

  constructor(
    private readonly rabbitClient: AmqpConnection,
    configService: ConfigService,
  ) {
    this.EXCHANGE_NAME = configService.get('RABBIMQ_EXCHANGE');
  }

  async send<T, K>(
    message: K,
    routingKey: string,
  ): Promise<RabbitMQResponse<T>> {
    const response = await this.rabbitClient.request<RabbitMQResponse<T>>({
      exchange: this.EXCHANGE_NAME,
      routingKey: routingKey,
      payload: {
        message: message,
      },
    });

    this.logger.log(`receive success: ${response.success}`);
    this.logger.log(response.message);

    return response;
  }
}
