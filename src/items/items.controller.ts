import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";

import { ItemsService } from "@/items/items.service";
import { CreateItemDto } from "@/items/dto/create-item.dto";
import { UpdateItemDto } from "@/items/dto/update-item.dto";
import {
  DatabaseName,
  ExistsGuard,
  IgnoreExistsGuard,
} from "@/guards/ExistsGuard";

export type ItemsFindAllQuery = {
  category: "men" | "women";
};

@Controller("items")
@DatabaseName("item")
@UseGuards(ExistsGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @IgnoreExistsGuard()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @IgnoreExistsGuard()
  findAll(@Query() query: ItemsFindAllQuery) {
    const category = query.category;

    return this.itemsService.findAll(category);
  }

  @Get(":id")
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
