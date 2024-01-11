import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { AddressService } from "@/address/address.service";
import { CreateAddressDto, UpdateAddressDto } from "@/address/dto";

import { SetDatabaseName } from "@/decorators/set-database.decorator";

@Controller("addresses")
@SetDatabaseName("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.addressService.remove(id);
  }
}
