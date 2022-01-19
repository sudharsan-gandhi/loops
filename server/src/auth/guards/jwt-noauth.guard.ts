import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthService } from '../auth.service';

/**
 * Always returns true. Its basically unguarded.
 * Used to just attach the user details to the request if cookie is available.
 */
@Injectable()
export class JwtNoauthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const token = this.getToken(req);
    if (token) {
      req.user = await this.authService.verifyToken(token);
    }
    return true;
  }

  getToken(req) {
    if (!req || !req.cookies) return null;
    return req.cookies['accessToken'];
  }
}
