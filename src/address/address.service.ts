import { Injectable, NotFoundException } from "@nestjs/common";

import { UpdateAddressDto } from "./dto/update-address.dto";
import { CreateAddressDto } from "./dto/create-address.dto";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class AddressService {
  constructor(private db: DatabaseService) {}

  create(createAddressDto: CreateAddressDto) {
    return this.db.address.create({
      data: createAddressDto,
    });
  }

  findAll() {
    return this.db.address.findMany();
  }

  findOne(id: string) {
    return this.db.address.findUnique({ where: { id } });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const existingEntry = await this.findOne(id);

    if (!existingEntry) {
      throw new NotFoundException();
    }

    return this.db.address.update({
      where: {
        id,
      },
      data: updateAddressDto,
    });
  }

  async remove(id: string) {
    const existingEntry = await this.findOne(id);

    if (!existingEntry) {
      throw new NotFoundException();
    }

    return this.db.address.delete({ where: { id } });
  }
}
