import { Request } from "express";
import { Reflector } from "@nestjs/core";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import getMetadata from "@/utils/helpers/getMetadata";
import isValidObjectId from "@/utils/helpers/isValidObjectId";
import { DatabaseService } from "@/database/database.service";
import { SetDatabaseKey } from "@/utils/decorators/set-database.decorator";
import { IgnoreExistenceKey } from "@/utils/decorators/ignore-existence.decorator";

@Injectable()
export class ExistsGuard implements CanActivate {
  constructor(
    private db: DatabaseService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;

    const ignoreExistence = getMetadata<boolean>(
      IgnoreExistenceKey,
      this.reflector,
      context,
    );

    if (
      ignoreExistence ||
      request.method === "GET" ||
      request.method === "POST"
    ) {
      return true;
    }

    const id = request.params.id;

    if (!isValidObjectId(id)) {
      throw new NotFoundException();
    }

    const dbName = getMetadata<string>(SetDatabaseKey, this.reflector, context);

    const entry = await this.db[dbName].findUnique({ where: { id } });

    const user = request["user"];
    if ("userId" in entry && entry["userId"] !== user.id) {
      throw new UnauthorizedException();
    }

    if (entry) {
      return true;
    } else {
      throw new NotFoundException();
    }
  }
}
