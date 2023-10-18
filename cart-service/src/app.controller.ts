import {
  Controller,
  Get,
  Logger,
  LoggerService,
  Req,
  Session,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger: LoggerService = new Logger(AppController.name);

  @Get()
  getHello(@Session() ses: Record<string, any>): string {
    if(ses){
      ses.visit = ses.visit ? ses.visit + 1 : 1;
    }
    return this.appService.getHello();
  }

  @Get('/test')
  getHelloTest(@Req() req: Request): string {
    console.log(req.session);
    return this.appService.getHello();
  }
}
