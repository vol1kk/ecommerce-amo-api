import { createZodDto } from "nestjs-zod";

import { UserSchema } from "@/users/entities/user.entity";
import { AddressSchema } from "@/address/entities/address.entity";
import { z } from "nestjs-zod/z";

const AddressNoId = AddressSchema.omit({ id: true, userId: true });

export class CreateUserDto extends createZodDto(
  UserSchema.omit({ id: true })
    .merge(z.object({ address: z.array(AddressNoId) }))
    .partial()
    .required({ email: true }),
) {}
