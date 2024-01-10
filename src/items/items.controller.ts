import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";

import { ItemsService } from "@/items/items.service";
import { CreateItemDto, UpdateItemDto } from "@/items/dto";
import { IgnoreAuth } from "@/decorators/ignore-auth.decorator";
import { SetDatabaseName } from "@/decorators/set-database.decorator";
import { IgnoreExistence } from "@/decorators/ignore-existence.decorator";

export type ItemsFindAllQuery = {
  category: "men" | "women";
};

@Controller("items")
@SetDatabaseName("item")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @IgnoreAuth()
  findAll(@Query() query: ItemsFindAllQuery) {
    const category = query.category;

    return this.itemsService.findAll(category);
  }

  @Get(":id")
  @IgnoreAuth()
  findOne(@Param("id") id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.itemsService.remove(id);
  }
}
