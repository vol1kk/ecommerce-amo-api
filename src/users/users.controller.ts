import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";

import { UsersService } from "@/users/users.service";
import isValidObjectId from "@/utils/isValidObjectId";
import { CreateUserDto } from "@/users/dto/create-user.dto";
import { UpdateUserDto } from "@/users/dto/update-user.dto";
import {
  DatabaseName,
  ExistsGuard,
  IgnoreExistsGuard,
} from "@/guards/ExistsGuard";

@Controller("users")
@DatabaseName("user")
@UseGuards(ExistsGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @IgnoreExistsGuard()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(":id")
  @IgnoreExistsGuard()
  findOne(@Param("id") id: string) {
    if (isValidObjectId(id)) {
      return this.usersService.findById(id);
    } else {
      return this.usersService.findByEmail(id);
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
