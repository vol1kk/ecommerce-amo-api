import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";
import { PartialType } from "@nestjs/mapped-types";

import { ItemCommentSchema, ItemSchema } from "@/items/entities/item.entity";

const CommentSchemaNoUser = ItemCommentSchema.omit({ user: true });
const ItemSchemaNoDetails = ItemSchema.omit({ detailsId: true }).merge(
  z.object({ comments: z.array(CommentSchemaNoUser) }),
);

export class UpdateItemDto extends PartialType(
  createZodDto(ItemSchemaNoDetails),
) {}
