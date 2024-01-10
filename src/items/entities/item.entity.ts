import { z } from "nestjs-zod/z";

export const ItemCommentSchema = z.object({
  id: z.string(),
  text: z.string(),
  author: z.string(),
  rating: z.number(),
  createdAt: z.dateString(),
  itemDetailsId: z.string(),
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
  comments: z.array(ItemCommentSchema),
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
});
