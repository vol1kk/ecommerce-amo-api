import { createZodDto } from "nestjs-zod";

import { TokenSchema } from "@/token/entities/token.entity";

export class TokenDto extends createZodDto(TokenSchema) {}
