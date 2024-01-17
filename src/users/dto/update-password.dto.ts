import { createZodDto } from "nestjs-zod";

import { PasswordSchema } from "@/users/entities/user.entity";

export class UpdatePasswordDto extends createZodDto(PasswordSchema) {}
