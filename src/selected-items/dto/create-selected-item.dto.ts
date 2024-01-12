import { createZodDto } from "nestjs-zod";
import { SelectedItemSchema } from "@/selected-items/entities/selected-item.entity";

export class CreateSelectedItemDto extends createZodDto(SelectedItemSchema) {}
