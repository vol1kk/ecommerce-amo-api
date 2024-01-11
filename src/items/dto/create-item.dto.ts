import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";

import {
  ItemSchema,
  ItemDetailsSchema,
  ItemCommentSchema,
} from "@/items/entities/item.entity";

export const CommentSchemaNoId = ItemCommentSchema.omit({
  id: true,
  user: true,
  userId: true,
});

export const DetailsSchemaNoId = ItemDetailsSchema.omit({ id: true });

export const ItemSchemaNoId = ItemSchema.omit({
  id: true,
  detailsId: true,
}).merge(
  z.object({
    details: DetailsSchemaNoId,
    comments: z.array(CommentSchemaNoId),
  }),
);

export class CreateItemDto extends createZodDto(ItemSchemaNoId) {}
