import { Reflector } from "@nestjs/core";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { Request } from "express";

@Injectable()
export class ExistsGuard implements CanActivate {
  constructor(
    private db: DatabaseService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ignoreExistence = this.reflector.get(
      "ignoreExistence",
      context.getHandler(),
    ) as string;

    if (ignoreExistence) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const id = request.params.id;

    const isValidId = new RegExp("^[0-9a-fA-F]{24}$").test(id);
    if (!isValidId) {
      throw new NotFoundException();
    }

    const dbName = this.reflector.get(
      "databaseName",
      context.getClass(),
    ) as string;

    const entry = await this.db[dbName].findUnique({ where: { id } });
    if (entry) {
      return true;
    } else {
      throw new NotFoundException();
    }
  }
}

export const DatabaseName = (name: string) => SetMetadata("databaseName", name);
export const IgnoreExistsGuard = () => SetMetadata("ignoreExistence", true);

// For some reason this.db in mixin is undefined
// export function ExistsInGuard(database: string): Type<CanActivate> {
//   class ExistsInGuardMixin implements CanActivate {
//     constructor(private db: DatabaseService) {}
//     async canActivate(context: ExecutionContext) {
//       // const addresses = await this.db.address.findMany();
//       console.log(this.db, database);
//       return true;
//     }
//   }
//
//   return mixin(ExistsInGuardMixin);
// }
