import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Get access token from cookie
 * 
 * Validate it using 'ACCESS_SECRET' key
 */
@Injectable()
export class CookieTokenGuard extends AuthGuard('cookie') {}
