import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";

import { UpdateUserDto } from "@/users/dto";
import { UsersService } from "@/users/users.service";

import isValidObjectId from "@/utils//helpers/isValidObjectId";
import { SetDatabaseName } from "@/utils//decorators/set-database.decorator";

@Controller("users")
@SetDatabaseName("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
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
