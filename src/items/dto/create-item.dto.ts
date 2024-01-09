import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import {
  ItemSchema,
  ItemCommentSchema,
  ItemDetailsSchema,
} from "../entities/item.entity";

export const CommentSchemaNoId = ItemCommentSchema.omit({
  id: true,
  itemDetailsId: true,
});

export const DetailsSchemaNoId = ItemDetailsSchema.omit({ id: true }).merge(
  z.object({ comments: z.array(CommentSchemaNoId) }),
);

export const ItemSchemaNoId = ItemSchema.omit({
  id: true,
  detailsId: true,
}).merge(z.object({ details: DetailsSchemaNoId }));

export class CreateItemDto extends createZodDto(ItemSchemaNoId) {}
