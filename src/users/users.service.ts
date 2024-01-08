import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    // eslint-disable-next-line
    const { id, ...data } = createUserDto;
    return this.db.user.create({
      data: {
        ...data,
        address: {
          create: [],
        },
      },
    });
  }

  findOne(id: string) {
    return this.db.user.findUnique({ where: { id } });
  }

  update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    // eslint-disable-next-line
    const { address, ...data } = updateUserDto;
    return this.db.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  remove(id: string) {
    return this.db.user.delete({ where: { id } });
  }
}
