import { Controller } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class MessagingController {

  constructor(private readonly messagingService: MessagingService) {}

  @RabbitRPC({
    exchange: 'swagflow',
    routingKey: 'account-queue',
    queue: 'account-queue',
  })
  async getAccountInfo(body: { message: string }) {
    return await this.messagingService.verifyAndGetAccount(body.message);
  }
}
