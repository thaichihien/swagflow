import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class CartSessionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();

    const header = request.headers['authorization'];

    if (header) {
      const token = header.substring(7);
      request.session['anonymous'] = false;
      request.session['user'] = token;
    } else {
      request.session['anonymous'] = true;
      if (request.session && request.session['cart_id']) {
        return next.handle();
      }
     
      request.session['cart_id'] = crypto.randomBytes(16).toString('hex');
    }

    return next.handle();
  }
}
