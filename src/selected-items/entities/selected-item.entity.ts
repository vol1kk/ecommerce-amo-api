import { z } from "nestjs-zod/z";

export const SelectedItemSchema = z.object({
  itemId: z.string(),
  isInWishlist: z.boolean().optional(),
  isInCart: z.boolean().optional(),
  color: z.string().optional(),
  quantity: z.number().optional(),
  size: z.string().optional(),
});
