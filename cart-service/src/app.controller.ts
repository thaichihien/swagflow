import { Controller, Get, Logger, LoggerService, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger : LoggerService = new Logger(AppController.name)

  @Get()
  getHello(@Req() req: Request): string {
    this.logger.debug(req.session)    
    return this.appService.getHello();
  }
}
