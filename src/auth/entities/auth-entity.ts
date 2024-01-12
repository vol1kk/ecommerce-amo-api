import { z } from "nestjs-zod/z";

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
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
