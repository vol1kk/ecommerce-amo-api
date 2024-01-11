import { Module } from "@nestjs/common";

import { AuthService } from "@/auth/auth.service";
import { UsersModule } from "@/users/users.module";
import { TokenModule } from "@/token/token.module";
import { AuthController } from "@/auth/auth.controller";

@Module({
  imports: [UsersModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
