import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/database/database.module";
import { SelectedItemsService } from "@/selected-items/selected-items.service";
import { SelectedItemsController } from "@/selected-items/selected-items.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [SelectedItemsController],
  providers: [SelectedItemsService],
})
export class SelectedItemsModule {}
