import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";
import { PartialType } from "@nestjs/mapped-types";

import { DetailsSchemaNoId, ItemSchemaNoId } from "@/items/dto/create-item.dto";

const DetailsSchemaNoComments = DetailsSchemaNoId.omit({ comments: true });
const ItemSchemaNoComments = ItemSchemaNoId.merge(
  z.object({ details: DetailsSchemaNoComments }),
);

export class UpdateItemDto extends PartialType(
  createZodDto(ItemSchemaNoComments),
) {}
