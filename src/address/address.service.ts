import { Injectable } from "@nestjs/common";

import { DatabaseService } from "@/database/database.service";
import { CreateAddressDto } from "@/address/dto/create-address.dto";
import { UpdateAddressDto } from "@/address/dto/update-address.dto";

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
