import { z } from "nestjs-zod/z";

export const TokenSchema = z.object({
  token: z.string(),
  type: z.union([z.literal("access"), z.literal("refresh")]),
});
