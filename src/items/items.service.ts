import { Inject, Injectable, Scope } from "@nestjs/common";

import { CreateItemDto, UpdateItemDto } from "@/items/dto";
import { ItemsFindAllQuery } from "@/items/items.controller";
import { DatabaseService } from "@/database/database.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class ItemsService {
  constructor(
    private db: DatabaseService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  create(createItemDto: CreateItemDto) {
    const { details, comments, ...item } = createItemDto;

    const commentsWithUserId = comments.map(c => ({
      ...c,
      userId: this.request["user"].id as string,
    }));

    return this.db.item.create({
      data: {
        ...item,
        details: {
          create: details,
        },
        comments: {
          createMany: {
            data: commentsWithUserId,
          },
        },
      },
    });
  }

  async findAll(category: ItemsFindAllQuery["category"]) {
    return this.db.item.findMany({
      where: { category },
      include: { details: true, comments: true },
    });
  }

  findOne(id: string) {
    return this.db.item.findUnique({
      where: { id },
      include: { details: true, comments: true },
    });
  }

  // TODO: Create /comments route to update existing comments
  async update(id: string, updateItemDto: Partial<UpdateItemDto>) {
    const { details, comments, ...item } = updateItemDto;

    return this.db.$transaction(async tx => {
      const pendingUpdates: Promise<any>[] = [];
      for (const c of comments || []) {
        // noinspection TypeScriptValidateJSTypes
        pendingUpdates.push(
          tx.comment.update({
            where: { id: c.id },
            data: c,
          }),
        );
      }

      // Updating all addresses
      await Promise.all(pendingUpdates);

      // noinspection TypeScriptValidateJSTypes
      return tx.item.update({
        where: { id },
        data: {
          ...item,
          details: {
            update: details,
          },
        },
      });
    });
  }

  async remove(id: string) {
    return this.db.item.delete({ where: { id } });
  }
}
