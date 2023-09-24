import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayLoad } from '../interfaces/jwt.payload';

@Injectable()
export class CookieTokenStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        CookieTokenStrategy.extractJwtFromCookie,
      ]),
      secretOrKey: process.env['ACCESS_SECRET'],
    });
  }

  static extractJwtFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }

    return null;
  }

  validate(payload: JwtPayLoad) {
    return payload;
  }
}
