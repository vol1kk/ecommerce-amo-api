import { Module } from "@nestjs/common";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ItemsModule } from "./items/items.module";
import { UsersModule } from "./users/users.module";
import { AddressModule } from "./address/address.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [ItemsModule, DatabaseModule, AddressModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
