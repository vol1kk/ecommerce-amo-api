import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";

import { CreateSelectedItemDto } from "@/selected-items/dto/create-selected-item.dto";
import { UpdateSelectedItemDto } from "@/selected-items/dto/update-selected-item.dto";
import { DatabaseService } from "@/database/database.service";
import { REQUEST } from "@nestjs/core";
import { SelectedItemFind } from "@/selected-items/selected-items.controller";
import { TokenService } from "@/token/token.service";

@Injectable({ scope: Scope.REQUEST })
export class SelectedItemsService {
  constructor(
    private db: DatabaseService,
    private tokenService: TokenService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  create(createSelectedItemDto: CreateSelectedItemDto) {
    const createdById = this.request["user"].id;

    return this.db.selectedItem.create({
      data: {
        ...createSelectedItemDto,
        userId: createdById,
      },
    });
  }

  async findAll(type: SelectedItemFind["type"]) {
    const createdById = await this.localAuthCheck();

    if (!createdById) {
      return [];
    }

    if (type === "all") {
      return this.db.selectedItem.findMany({
        where: { userId: createdById },
        include: { item: true },
      });
    }

    const parsedType = type === "cart" ? "isInCart" : "isInWishlist";
    return this.db.selectedItem.findMany({
      where: { [parsedType]: true, userId: createdById },
      include: { item: true },
    });
  }

  async findOne(id: string) {
    const createdById = await this.localAuthCheck();

    if (!createdById) {
      return JSON.stringify(null);
    }

    const foundItem = await this.db.selectedItem.findFirst({
      where: { OR: [{ itemId: id }, { id }], userId: createdById },
    });

    return foundItem || JSON.stringify(null);
  }

  async update(id: string, updateSelectedItemDto: UpdateSelectedItemDto) {
    const item = await this.findOne(id);

    if (typeof item === "string") {
      throw new NotFoundException();
    }

    return this.db.selectedItem.update({
      where: { id: item.id },
      data: updateSelectedItemDto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} selectedItem`;
  }

  private async localAuthCheck() {
    const [, token] = this.request.headers["authorization"]?.split(" ") || [];

    if (!token) {
      return null;
    }

    try {
      const payload = await this.tokenService.verifyToken(token, "access");
      return payload.id;
    } catch (e) {
      return null;
    }
  }
}
