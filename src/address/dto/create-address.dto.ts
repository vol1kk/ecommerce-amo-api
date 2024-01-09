import { createZodDto } from "nestjs-zod";
import { AddressSchema } from "../entities/address.entity";

export class CreateAddressDto extends createZodDto(
  AddressSchema.omit({ id: true }),
) {}
