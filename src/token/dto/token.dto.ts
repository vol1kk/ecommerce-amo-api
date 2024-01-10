import { createZodDto } from "nestjs-zod";
import { PickType } from "@nestjs/mapped-types";

import { TokenSchema } from "@/token/entities/token.entity";

export class TokenDto extends createZodDto(TokenSchema) {}
