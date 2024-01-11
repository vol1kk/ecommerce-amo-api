import { z } from "nestjs-zod/z";
import { ItemSchema } from "@/items/entities/item.entity";
import { UserSchema } from "@/users/entities/user.entity";

export const SelectedItemSchema = z.object({
  item: ItemSchema,
  itemId: z.string(),
  color: z.string(),
  quantity: z.number(),
  size: z.string(),
  user: UserSchema.optional(),
  userId: z.string().optional(),
});
