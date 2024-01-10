import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { TokenDto } from "@/token/dto/token.dto";

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async refreshRotate(token: string) {
    const payload = await this.verifyToken(token, "refresh");

    return this.generateTokens({
      id: payload.id,
      email: payload.email,
    });
  }

  async generateTokens(payload: object | Buffer) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "5m",
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: "14d",
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string, type: TokenDto["type"]) {
    try {
      return (await this.jwtService.verifyAsync(token, {
        secret:
          type === "access"
            ? process.env.JWT_SECRET
            : process.env.JWT_REFRESH_SECRET,
      })) as { id: string; email: string };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
