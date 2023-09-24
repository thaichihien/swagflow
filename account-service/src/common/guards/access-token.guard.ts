import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Get access token from Header
 * 
 * Example : "Authorization : Bearer {token}"
 * 
 * Validate it using 'ACCESS_SECRET' key
 */
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt'){}