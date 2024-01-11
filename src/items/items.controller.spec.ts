import { Test, TestingModule } from "@nestjs/testing";

import { ItemsService } from "@/items/items.service";
import { ItemsController } from "@/items/items.controller";

describe("ItemsController", () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
