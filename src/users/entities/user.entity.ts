import { z } from "nestjs-zod/z";

import { AddressSchema } from "@/address/entities/address.entity";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email({ message: "invalid_email" }),
  surname: z.string(),
  phone: z.string().nullable(),
  address: z.array(AddressSchema),
  password: z.string().nullable(),
  image: z.string().nullable(),
});

export const PasswordSchema = z
  .object({
    currentPass: z.string(),
    newPass: z.string().min(3, { message: "min_length" }),
    repeatedPass: z.string(),
  })
  .refine(schema => schema.newPass === schema.repeatedPass, {
    message: "password_not_match",
    path: ["repeatedPass"],
  });
