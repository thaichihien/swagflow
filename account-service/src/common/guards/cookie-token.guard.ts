import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Get token from cookie
 * 
 * Validate it using 'REFRESH_SECRET' key
 */
@Injectable()
export class CookieTokenGuard extends AuthGuard('cookie') {}
