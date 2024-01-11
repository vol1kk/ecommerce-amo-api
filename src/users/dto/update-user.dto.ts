import { createZodDto } from "nestjs-zod";
import { PartialType } from "@nestjs/mapped-types";

import { UserSchema } from "@/users/entities/user.entity";

export class UpdateUserDto extends PartialType(
  createZodDto(UserSchema),
) {}
