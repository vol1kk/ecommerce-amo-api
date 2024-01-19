import * as bcrypt from "bcrypt";
import { REQUEST } from "@nestjs/core";
import { ZodValidationException } from "nestjs-zod";
import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from "@nestjs/common";

import omitPassword from "@/utils/helpers/omitPassword";
import { UserSchema } from "@/users/entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "@/users/dto";
import { DatabaseService } from "@/database/database.service";
import { UpdatePasswordDto } from "@/users/dto/update-password.dto";

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    private db: DatabaseService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { address, ...user } = createUserDto;

    return this.db.user.create({
      data: {
        ...user,
        ...(address && {
          address: {
            createMany: { data: [] },
          },
        }),
      },
    });
  }

  async findMe() {
    const id = this.request["user"].id;
    if (!id) {
      throw new UnauthorizedException();
    }

    const res = await this.db.user.findUnique({
      where: { id },
      include: { address: true, accounts: { select: { type: true } } },
    });

    return omitPassword(res);
  }

  findById(id: string) {
    if (this.request["user"]?.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.user.findUnique({
      where: { id },
      include: { address: true },
    });
  }

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
      include: { address: true },
    });
  }

  // Disabling rule, because WebStorm's Prisma plugin being weird
  update(id: string, updateUserDto: UpdateUserDto) {
    // Object with {key: true}  for each key that user passed
    const existingKeys = Object.keys(updateUserDto).reduce((acc, key) => {
      if (!acc[key]) acc[key] = true;
      return acc;
    }, {});

    // Validating optional fields that user passed
    const ExistingKeysSchema = UserSchema.pick(existingKeys);
    const validationResult = ExistingKeysSchema.safeParse(updateUserDto);
    if (!validationResult.success) {
      throw new ZodValidationException(validationResult.error);
    }

    // Start updating user if validation passed
    const { address, ...data } = updateUserDto;

    return this.db.$transaction(async tx => {
      const pendingUpdates: Promise<any>[] = [];
      for (const a of address || []) {
        // noinspection TypeScriptValidateJSTypes
        pendingUpdates.push(
          tx.address.update({ where: { id: a.id }, data: a }),
        );
      }

      // Updating all addresses
      await Promise.all(pendingUpdates);

      // noinspection TypeScriptValidateJSTypes
      const { password, ...user } = await tx.user.update({ // eslint-disable-line
        where: { id },
        data,
      });

      return user;
    });
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (id !== this.request["user"].id) {
      throw new UnauthorizedException();
    }

    const { currentPass, newPass, repeatedPass } = updatePasswordDto;

    const existingUser = await this.db.user.findUnique({
      where: { id },
    });

    const isSamePassword = await bcrypt.compare(
      currentPass,
      existingUser?.password || "",
    );

    if (!isSamePassword) {
      throw new BadRequestException({
        statusCode: 400,
        message: "wrong_pass",
        errors: [{ path: ["currentPass"], message: "invalid_pass" }],
      });
    }

    if (newPass !== repeatedPass) {
      throw new BadRequestException("passwords_not_match");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPass, salt);

    return this.db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  remove(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
