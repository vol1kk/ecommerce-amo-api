import { z } from "nestjs-zod/z";
import { UserSchema } from "@/users/entities/user.entity";

export const ItemCommentSchema = z.object({
  id: z.string(),
  text: z.string(),
  user: UserSchema,
  userId: z.string(),
  rating: z.number(),
  createdAt: z.dateString(),
});

export const ItemDetailsSchema = z.object({
  id: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  fabric: z.string(),
  pattern: z.string(),
  fit: z.string(),
  neck: z.string(),
  sleeve: z.string(),
  style: z.string(),
});

export const ItemSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  price: z.number(),
  details: ItemDetailsSchema,
  detailsId: z.string(),
  comments: z.array(ItemCommentSchema),
});
