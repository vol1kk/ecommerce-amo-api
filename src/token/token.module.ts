import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { TokenService } from "@/token/token.service";
import { TokenController } from "@/token/token.controller";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
