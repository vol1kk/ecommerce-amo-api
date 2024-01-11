import {
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from "@nestjs/common";

import { CreateUserDto, UpdateUserDto } from "@/users/dto";

import { DatabaseService } from "@/database/database.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    private db: DatabaseService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { address, ...user } = createUserDto;

    return this.db.user.create({
      data: {
        ...user,
        ...(address && {
          address: {
            createMany: { data: [] },
          },
        }),
      },
    });
  }

  findById(id: string) {
    if (this.request["user"]?.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.user.findUnique({
      where: { id },
      include: { address: true },
    });
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
      include: { address: true },
    });
  }

  // Disabling rule, because WebStorm's Prisma plugin being weird
  update(id: string, updateUserDto: UpdateUserDto) {
    const { address, ...data } = updateUserDto;

    return this.db.$transaction(async tx => {
      const pendingUpdates: Promise<any>[] = [];
      for (const a of address || []) {
        // noinspection TypeScriptValidateJSTypes
        pendingUpdates.push(
          tx.address.update({ where: { id: a.id }, data: a }),
        );
      }

      // Updating all addresses
      await Promise.all(pendingUpdates);

      // Updating user in the end
      // noinspection TypeScriptValidateJSTypes
      return tx.user.update({
        where: { id },
        data,
      });
    });
  }

  remove(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
