import { createZodDto } from "nestjs-zod";

import { UserSchema } from "@/users/entities/user.entity";

export class CreateUserDto extends createZodDto(
  UserSchema.omit({ id: true }).partial().required({ email: true }),
) {}
