import { z } from "nestjs-zod/z";

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
