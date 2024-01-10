import { Body, Controller, Post } from "@nestjs/common";

import { AuthDto } from "@/auth/dto/auth-dto";
import { AuthService } from "@/auth/auth.service";

@Controller("auth")
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
}
