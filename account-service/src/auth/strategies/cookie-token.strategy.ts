import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayLoad } from '../interfaces/jwt.payload';



/**
 * Get refresh token from cookie
 */
@Injectable()
export class CookieTokenStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        CookieTokenStrategy.extractJwtFromCookie,
      ]),
      secretOrKey: process.env['REFRESH_SECRET'],
      passReqToCallback: true,
    });
  }

  static extractJwtFromCookie(req: Request): string | null {
    console.log(req.cookies);
    if (req.cookies && req.cookies['token']) {
     
      return req.cookies['token'];
    }

    return null;
  }

  validate(req: Request,payload: JwtPayLoad,) {
    const refreshToken = req.cookies["token"]
    return { ...payload, refreshToken };
  }
}
