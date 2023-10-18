import { Controller, Get, Param } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductDetailDto } from 'src/cart/dto/product-detail.dto';

@Controller('message')
@ApiTags('Rabbit MQ')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get(":body")
  testSendRPC(@Param('body') messgage : string) {
    //console.log('Send...');
    //return this.messagingService.testSend(messgage);
  }

  @Get()
  testArraySendRPC() {
    //console.log('Send...');

    const ids = [
      "12210375-7327-45f1-8cf3-8e09443bde35",
      "26908110-e55e-4683-85b9-670ab923aed1",
      "46a7b3c0-3e17-4d75-ae60-f66feb42ed13",
      "83e34294-e665-4289-af8a-ed535c521a14"
    ]

    return this.messagingService.send<ProductDetailDto[],string[]>(ids,"products-detail-queue")
  }
}
