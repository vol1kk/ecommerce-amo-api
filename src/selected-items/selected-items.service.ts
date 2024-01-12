import { Inject, Injectable, Scope } from "@nestjs/common";

import { CreateSelectedItemDto } from "@/selected-items/dto/create-selected-item.dto";
import { UpdateSelectedItemDto } from "@/selected-items/dto/update-selected-item.dto";
import { DatabaseService } from "@/database/database.service";
import { REQUEST } from "@nestjs/core";
import { SelectedItemFind } from "@/selected-items/selected-items.controller";
import { TokenService } from "@/token/token.service";
import { IgnoreAuth } from "@/utils/decorators/ignore-auth.decorator";

@Injectable({ scope: Scope.REQUEST })
export class SelectedItemsService {
  constructor(
    private db: DatabaseService,
    private tokenService: TokenService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  create(createSelectedItemDto: CreateSelectedItemDto) {
    return "This action adds a new selectedItem";
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

  findOne(id: string) {
    return `This action returns a #${id} selectedItem`;
  }

  update(id: string, updateSelectedItemDto: UpdateSelectedItemDto) {
    return this.db.selectedItem.update({
      where: { id },
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
