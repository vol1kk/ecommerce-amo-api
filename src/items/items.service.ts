import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemsFindAllQuery } from "./items.controller";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class ItemsService {
  constructor(private db: DatabaseService) {}

  create(createItemDto: CreateItemDto) {
    const { details, ...item } = createItemDto;
    const { comments, ...detailsRest } = details;

    return this.db.item.create({
      data: {
        ...item,
        details: {
          create: {
            ...detailsRest,
            comments: { createMany: { data: comments } },
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

  // TODO: Create /comments route to update existing comments
  async update(id: string, updateItemDto: Partial<UpdateItemDto>) {
    const { details, ...item } = updateItemDto;

    return this.db.item.update({
      where: {
        id,
      },
      data: {
        ...item,
        details: {
          update: {
            ...details,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.db.item.delete({ where: { id } });
  }
}
