import { createZodDto } from "nestjs-zod";
import { AuthSchema } from "@/auth/entities/auth-entity";

export class AuthDto extends createZodDto(AuthSchema) {}
