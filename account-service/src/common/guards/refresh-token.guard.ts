import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Get refresh token from Header
 * 
 * Example : "Authorization : Bearer {token}"
 * 
 * Validate it using 'REFRESH_SECRET' key
 */
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}
