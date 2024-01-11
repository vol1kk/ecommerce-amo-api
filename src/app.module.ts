import { Module } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";

import { AppService } from "@/app.service";
import { AuthModule } from "@/auth/auth.module";
import { AppController } from "@/app.controller";
import { ItemsModule } from "@/items/items.module";
import { UsersModule } from "@/users/users.module";
import { TokenModule } from "@/token/token.module";
import { AuthGuard } from "@/utils//guards/auth.guard";
import { AddressModule } from "@/address/address.module";
import { ExistsGuard } from "@/utils//guards/exists.guard";
import { DatabaseModule } from "@/database/database.module";
import { SelectedItemsModule } from "@/selected-items/selected-items.module";

@Module({
  imports: [
    AuthModule,
    TokenModule,
    ItemsModule,
    UsersModule,
    AddressModule,
    DatabaseModule,
    SelectedItemsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ExistsGuard,
    },
  ],
})
export class AppModule {}
