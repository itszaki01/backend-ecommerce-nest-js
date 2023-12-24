import { Injectable } from '@nestjs/common';
import { CreateUsersLoggedinDto } from './dto/create-users-loggedin.dto';
import { UpdateUsersLoggedinDto } from './dto/update-users-loggedin.dto';

@Injectable()
export class UsersLoggedinService {
  create(createUsersLoggedinDto: CreateUsersLoggedinDto) {
    return 'This action adds a new usersLoggedin';
  }

  findAll() {
    return `This action returns all usersLoggedin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersLoggedin`;
  }

  update(id: number, updateUsersLoggedinDto: UpdateUsersLoggedinDto) {
    return `This action updates a #${id} usersLoggedin`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersLoggedin`;
  }
}
