import { Request } from "express";
import { Reflector } from "@nestjs/core";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from "@nestjs/common";

import getMetadata from "@/utils/getMetadata";
import isValidObjectId from "@/utils/isValidObjectId";
import { DatabaseService } from "@/database/database.service";
import { SetDatabaseKey } from "@/decorators/set-database.decorator";
import { IgnoreExistenceKey } from "@/decorators/ignore-existence.decorator";

@Injectable()
export class ExistsGuard implements CanActivate {
  constructor(
    private db: DatabaseService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ignoreExistence = getMetadata<boolean>(
      IgnoreExistenceKey,
      this.reflector,
      context,
    );

    if (ignoreExistence) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const id = request.params.id;

    if (!isValidObjectId(id)) {
      throw new NotFoundException();
    }

    const dbName = getMetadata<string>(SetDatabaseKey, this.reflector, context);

    const entry = await this.db[dbName].findUnique({ where: { id } });
    if (entry) {
      return true;
    } else {
      throw new NotFoundException();
    }
  }
}
