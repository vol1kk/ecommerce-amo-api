import { createZodDto } from "nestjs-zod";

import { UserSchema } from "../entities/user.entity";

export class CreateUserDto extends createZodDto(
  UserSchema.omit({ id: true }),
) {}
