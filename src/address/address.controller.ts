import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";

import {
  DatabaseName,
  ExistsGuard,
  IgnoreExistsGuard,
} from "../guards/ExistsGuard";

import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("addresses")
@DatabaseName("address")
@UseGuards(ExistsGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @IgnoreExistsGuard()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @IgnoreExistsGuard()
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
