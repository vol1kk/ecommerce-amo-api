import { APP_PIPE } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";

import { AppService } from "@/app.service";
import { AppController } from "@/app.controller";
import { ItemsModule } from "@/items/items.module";
import { UsersModule } from "@/users/users.module";
import { AddressModule } from "@/address/address.module";
import { DatabaseModule } from "@/database/database.module";

@Module({
  imports: [ItemsModule, UsersModule, AddressModule, DatabaseModule],
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
