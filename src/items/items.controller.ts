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

import { ItemsService } from "./items.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

export type ItemsFindAllQuery = {
  category: "men" | "women";
};

@Controller("items")
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
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
