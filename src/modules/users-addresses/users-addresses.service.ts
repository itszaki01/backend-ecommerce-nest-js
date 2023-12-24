import { Injectable } from '@nestjs/common';
import { CreateUsersAddressDto } from './dto/create-users-address.dto';
import { UpdateUsersAddressDto } from './dto/update-users-address.dto';

@Injectable()
export class UsersAddressesService {
  create(createUsersAddressDto: CreateUsersAddressDto) {
    return 'This action adds a new usersAddress';
  }

  findAll() {
    return `This action returns all usersAddresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersAddress`;
  }

  update(id: number, updateUsersAddressDto: UpdateUsersAddressDto) {
    return `This action updates a #${id} usersAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersAddress`;
  }
}
