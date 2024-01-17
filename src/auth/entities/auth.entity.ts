import { z } from "nestjs-zod/z";

export const AuthSchema = z.object({
  email: z.string().email({ message: "not_email" }),
  password: z.string().min(3, { message: "min_length" }),
});

export const OAuthTokenSchema = z.object({
  name: z.string(),
  email: z.string(),
  picture: z.string().optional(),
});

export const OAuthAccountSchema = z.object({
  id: z.string().optional(),
  provider: z.string(),
  type: z.literal("oauth"),
  providerAccountId: z.string(),
  access_token: z.string(),
  token_type: z.string(),
  scope: z.string(),
});

export const OAuthSchema = z.object({
  token: OAuthTokenSchema,
  account: OAuthAccountSchema,
});
