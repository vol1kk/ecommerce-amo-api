import { z } from "nestjs-zod/z";
import { AddressSchema } from "../../address/entities/address.entity";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  surname: z.string(),
  phone: z.string().nullable(),
  address: z.array(AddressSchema),
  password: z.string().nullable(),
  image: z.string().nullable(),
});
