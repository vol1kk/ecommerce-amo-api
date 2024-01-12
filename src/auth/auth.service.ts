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
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
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

    const tokens = await this.tokenService.generateTokens({
      id: existingUser.id,
      email: existingUser.email,
    });

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
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      email: user.email,
    });

    return Object.assign(user, tokens);
  }

  async oauth(oauthDto: OAuthDto) {
    const existingUser = await this.usersService.findByEmail(
      oauthDto.token.email,
    );

    if (!existingUser) {
      return this.oauthRegister(oauthDto);
    } else {
      return this.oauthLogin(existingUser);
    }
  }

  private async oauthRegister(oauthDto: OAuthDto) {
    const { picture, ...token } = oauthDto.token;

    const createdUser = await this.usersService.create({
      ...token,
      image: picture,
    });

    const tokens = await this.tokenService.generateTokens({
      id: createdUser.id,
      email: createdUser.email,
    });

    await this.db.account.create({
      data: {
        ...oauthDto.account,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });

    return Object.assign(createdUser, tokens);
  }

  private async oauthLogin(
    existingUser: Awaited<ReturnType<UsersService["findByEmail"]>>,
  ) {
    const tokens = await this.tokenService.generateTokens({
      id: existingUser?.id,
      email: existingUser?.email,
    });

    return Object.assign(existingUser || {}, tokens);
  }
}
