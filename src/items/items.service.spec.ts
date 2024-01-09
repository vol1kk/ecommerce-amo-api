import { ItemsService } from "@/items/items.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("ItemsService", () => {
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
