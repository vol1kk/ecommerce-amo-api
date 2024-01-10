import { Body, Controller, Post } from "@nestjs/common";

import { TokenDto } from "@/token/dto/token.dto";
import { TokenService } from "@/token/token.service";

@Controller("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post("validate")
  validate(@Body() tokenDto: TokenDto) {
    return this.tokenService.verifyToken(tokenDto.token, tokenDto.type);
  }

  @Post("refresh")
  refresh(@Body() tokenDto: TokenDto) {
    return this.tokenService.refreshRotate(tokenDto.token);
  }
}
