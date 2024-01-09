import { Test, TestingModule } from "@nestjs/testing";

import { AddressService } from "@/address/address.service";
import { AddressController } from "@/address/address.controller";

describe("AddressController", () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
