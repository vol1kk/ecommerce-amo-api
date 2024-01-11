import { Test, TestingModule } from "@nestjs/testing";

import { SelectedItemsService } from "@/selected-items/selected-items.service";
import { SelectedItemsController } from "@/selected-items/selected-items.controller";

describe("SelectedItemsController", () => {
  let controller: SelectedItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedItemsController],
      providers: [SelectedItemsService],
    }).compile();

    controller = module.get<SelectedItemsController>(SelectedItemsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
