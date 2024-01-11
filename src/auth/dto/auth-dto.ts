import { createZodDto } from "nestjs-zod";
import { AuthSchema, OAuthSchema } from "@/auth/entities/auth-entity";

export class AuthDto extends createZodDto(AuthSchema) {}
export class OAuthDto extends createZodDto(OAuthSchema) {}
