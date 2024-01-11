import * as bcrypt from "bcrypt";
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { UsersService } from "@/users/users.service";
import { TokenService } from "@/token/token.service";
import { AuthDto, OAuthDto } from "@/auth/dto/auth-dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: AuthDto) {
    const existingUser = await this.usersService.findByEmail(loginDto.email);

    if (!existingUser) {
      throw new NotFoundException();
    }

    const isSamePassword = await bcrypt.compare(
      loginDto.password,
      existingUser.password ?? "",
    );

    if (!isSamePassword) {
      throw new UnauthorizedException();
    }

    // Deleting password, so we don't send it to client
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = existingUser;

    const tokens = await this.tokenService.generateTokens(loginDto);

    return Object.assign(user, tokens);
  }

  async register(registerDto: AuthDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException();
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const createdUser = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
    });

    // Deleting password, so we don't send it to client
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = createdUser;
    console.log(createdUser);
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
    });
    console.log(tokens.accessToken);

    return Object.assign(user, tokens);
  }

  async oauth(oauthDto: OAuthDto) {
    const existingUser = await this.usersService.findByEmail(oauthDto.email);

    if (!existingUser) {
      const user = await this.usersService.create({
        email: oauthDto.email,
      });

      const tokens = await this.tokenService.generateTokens({
        id: user.id,
        email: user.email,
      });

      return Object.assign(user, tokens);
    } else {
      // TODO: Update account model every login just in case
      const tokens = await this.tokenService.generateTokens({
        id: existingUser.id,
        email: existingUser.email,
      });
      return Object.assign(existingUser, tokens);
    }
  }
}
