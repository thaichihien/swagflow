import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class ClearCookieInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler) {
    const response = context.switchToHttp().getResponse<Response>();

    response.clearCookie('token');
    response.clearCookie('have-token');

    return next.handle()
  }
}
