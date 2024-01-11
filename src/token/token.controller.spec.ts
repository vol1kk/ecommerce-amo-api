import { Test, TestingModule } from "@nestjs/testing";

import { TokenService } from "@/token/token.service";
import { TokenController } from "@/token/token.controller";

describe("TokenController", () => {
  let controller: TokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [TokenService],
    }).compile();

    controller = module.get<TokenController>(TokenController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
