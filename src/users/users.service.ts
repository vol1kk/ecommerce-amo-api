import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    return this.db.user.create({
      data: {
        ...createUserDto,
        address: {
          createMany: {
            data: createUserDto.address,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.db.user.findUnique({
      where: { id },
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
