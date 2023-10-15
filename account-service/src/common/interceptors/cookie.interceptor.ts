import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class CookieInterceptor implements NestInterceptor {

    private cookieOptions = {
      httpOnly: true,
      maxAge: 86400000 * 7,   // miliseconds
    };
  
    intercept(context: ExecutionContext, next: CallHandler) {
      const response = context.switchToHttp().getResponse<Response>();
  
      return next.handle().pipe(
        map((data) => {
          response.cookie("token", data.refreshToken, this.cookieOptions);
          return {
            "access_token": data.accessToken,
          };
        }),
      );
    }
  }
  