import { APP_PIPE } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";

import { AppService } from "@/app.service";
import { AuthModule } from "@/auth/auth.module";
import { AppController } from "@/app.controller";
import { ItemsModule } from "@/items/items.module";
import { UsersModule } from "@/users/users.module";
import { TokenModule } from "@/token/token.module";
import { AddressModule } from "@/address/address.module";
import { DatabaseModule } from "@/database/database.module";

@Module({
  imports: [
    AuthModule,
    TokenModule,
    ItemsModule,
    UsersModule,
    AddressModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
