import { z } from "nestjs-zod/z";

export const AddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  city: z.string(),
  address: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  isDefault: z.boolean().optional(),
  userId: z.string().nullable(),
  tags: z.array(z.string()).optional(),
});
