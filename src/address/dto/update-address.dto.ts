import { createZodDto } from "nestjs-zod";
import { PartialType } from "@nestjs/mapped-types";
import { AddressSchema } from "../entities/address.entity";

export class UpdateAddressDto extends PartialType(
  createZodDto(AddressSchema),
) {}
