import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import getMetadata from "@/utils/getMetadata";
import { IgnoreAuthKey } from "@/decorators/ignore-auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ignoreAuth = getMetadata(IgnoreAuthKey, this.reflector, context);

    if (ignoreAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [, token] = request.headers.authorization?.split(" ") ?? [];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request["user"] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
