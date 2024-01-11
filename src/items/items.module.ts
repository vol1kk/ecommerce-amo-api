import { Module } from "@nestjs/common";

import { ItemsService } from "@/items/items.service";
import { ItemsController } from "@/items/items.controller";
import { DatabaseModule } from "@/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
