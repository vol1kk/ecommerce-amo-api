import { Injectable } from "@nestjs/common";

import prepareItemDto from "./utils/prepareItemDto";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemsFindAllQuery } from "./items.controller";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class ItemsService {
  constructor(private db: DatabaseService) {}

  create(createItemDto: CreateItemDto) {
    const { itemData, detailsData, commentData } =
      prepareItemDto<"create">(createItemDto);

    return this.db.item.create({
      data: {
        ...itemData,
        details: {
          create: {
            ...detailsData,
            comments: {
              createMany: {
                data: commentData,
              },
            },
          },
        },
      },
    });
  }

  async findAll(category: ItemsFindAllQuery["category"]) {
    return this.db.item.findMany({
      where: { category },
      include: { details: { include: { comments: true } } },
    });
  }

  findOne(id: string) {
    return this.db.item.findUnique({
      where: { id },
      include: { details: { include: { comments: true } } },
    });
  }

  async update(id: string, updateItemDto: Partial<UpdateItemDto>) {
    const { itemData, detailsData } = prepareItemDto<"update">(updateItemDto);

    return this.db.item.update({
      where: {
        id,
      },
      data: {
        ...itemData,
        details: {
          update: {
            ...detailsData,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.db.item.delete({ where: { id } });
  }
}
