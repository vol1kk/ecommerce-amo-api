import { Test, TestingModule } from "@nestjs/testing";
import { SelectedItemsService } from "@/selected-items/selected-items.service";

describe("SelectedItemsService", () => {
  let service: SelectedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedItemsService],
    }).compile();

    service = module.get<SelectedItemsService>(SelectedItemsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
