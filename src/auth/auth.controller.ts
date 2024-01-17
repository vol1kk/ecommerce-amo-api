import { Body, Controller, Post, Res } from "@nestjs/common";

import { AuthService } from "@/auth/auth.service";
import { AuthDto, OAuthDto } from "@/auth/dto/auth.dto";
import { IgnoreAuth } from "@/utils/decorators/ignore-auth.decorator";
import { IgnoreExistence } from "@/utils/decorators/ignore-existence.decorator";

@Controller("auth")
@IgnoreAuth()
@IgnoreExistence()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

  @Post("register")
  register(@Body() registerDto: AuthDto) {
    return this.authService.register(registerDto);
  }

  @Post("oauth")
  oauth(@Body() oauthDto: OAuthDto) {
    return this.authService.oauth(oauthDto);
  }
}
