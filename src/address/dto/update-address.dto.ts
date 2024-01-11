import { createZodDto } from "nestjs-zod";
import { PartialType } from "@nestjs/mapped-types";

import { AddressSchema } from "@/address/entities/address.entity";

export class UpdateAddressDto extends PartialType(
  createZodDto(AddressSchema.omit({ id: true })),
) {}
