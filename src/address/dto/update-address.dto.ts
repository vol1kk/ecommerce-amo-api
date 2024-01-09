import { OmitType } from "@nestjs/mapped-types";
import { CreateAddressDto } from "./create-address.dto";

export class UpdateAddressDto extends OmitType(CreateAddressDto, [
  "id",
  "userId",
] as const) {}
