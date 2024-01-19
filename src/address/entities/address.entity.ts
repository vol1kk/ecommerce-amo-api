import { z } from "nestjs-zod/z";

export const AddressSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, { message: "min_length" }),
  surname: z.string(),
  city: z.string().trim().min(1, { message: "min_length" }),
  address: z.string().trim().min(1, { message: "min_length" }),
  postalCode: z.string().trim().min(1, { message: "min_length" }),
  phone: z.string().trim().min(1, { message: "min_length" }),
  isDefault: z.boolean().optional(),
  userId: z.string().nullable(),
  tags: z.array(z.string()).optional(),
});
