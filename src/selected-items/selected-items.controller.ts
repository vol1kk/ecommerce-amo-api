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
import { SelectedItemsService } from "@/selected-items/selected-items.service";
import { CreateSelectedItemDto } from "@/selected-items/dto/create-selected-item.dto";
import { UpdateSelectedItemDto } from "@/selected-items/dto/update-selected-item.dto";
import { IgnoreAuth } from "@/utils/decorators/ignore-auth.decorator";
import { SetDatabaseName } from "@/utils/decorators/set-database.decorator";
import { IgnoreExistence } from "@/utils/decorators/ignore-existence.decorator";

export type SelectedItemFind = {
  type: "all" | "wishlist" | "cart";
};

// TODO: @IgnoreExists() should be set for whole controller
@Controller("selected")
@SetDatabaseName("selectedItem")
export class SelectedItemsController {
  constructor(private readonly selectedItemsService: SelectedItemsService) {}

  @Post()
  create(@Body() createSelectedItemDto: CreateSelectedItemDto) {
    return this.selectedItemsService.create(createSelectedItemDto);
  }

  @Get()
  @IgnoreAuth()
  findAll(@Query() query: SelectedItemFind) {
    const type = query.type;

    return this.selectedItemsService.findAll(type);
  }

  @Get(":id")
  @IgnoreAuth()
  findOne(@Param("id") id: string) {
    return this.selectedItemsService.findOne(id);
  }

  @Patch(":id")
  @IgnoreExistence()
  update(
    @Param("id") id: string,
    @Body() updateSelectedItemDto: UpdateSelectedItemDto,
  ) {
    return this.selectedItemsService.update(id, updateSelectedItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.selectedItemsService.remove(id);
  }
}
