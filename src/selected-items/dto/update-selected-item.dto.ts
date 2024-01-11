import { PartialType } from "@nestjs/swagger";
import { CreateSelectedItemDto } from "./create-selected-item.dto";
import { SelectedItemSchema } from "@/selected-items/entities/selected-item.entity";
import { createZodDto } from "nestjs-zod";

export class UpdateSelectedItemDto extends PartialType(
  createZodDto(
    SelectedItemSchema.omit({
      user: true,
      userId: true,
      item: true,
      itemId: true,
    }),
  ),
) {}
