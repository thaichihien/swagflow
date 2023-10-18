import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderJWTGuard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const header = request.headers['authorization'];

    if (!header) {
      return false;
    }

    const token = header.replace('Bearer', '').trim();

    const validJWT = this.jwtService.decode(token);

    if (!validJWT) {
      return false;
    }

    return true;
  }
}
