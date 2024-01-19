import { REQUEST } from "@nestjs/core";
import { Inject, Injectable, Scope } from "@nestjs/common";

import { DatabaseService } from "@/database/database.service";
import { CreateAddressDto } from "@/address/dto/create-address.dto";
import { UpdateAddressDto } from "@/address/dto/update-address.dto";

@Injectable({ scope: Scope.REQUEST })
export class AddressService {
  constructor(
    private db: DatabaseService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  create(createAddressDto: CreateAddressDto) {
    const createdBy = this.request["user"]?.id as string;

    return this.db.address.create({
      data: {
        ...createAddressDto,
        userId: createdBy,
      },
    });
  }

  findAll() {
    const userId = this.request["user"]?.id;

    return this.db.address.findMany({ where: { userId } });
  }

  findOne(id: string) {
    const userId = this.request["user"]?.id;

    return this.db.address.findUnique({ where: { id, userId } });
  }

  async update(id: string, updateAddressDto: CreateAddressDto) {
    return this.db.address.update({
      where: {
        id,
      },
      data: updateAddressDto,
    });
  }

  async remove(id: string) {
    return this.db.address.delete({ where: { id } });
  }
}
