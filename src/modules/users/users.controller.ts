import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from '../mongo/pipes/parse-mongo-id.pipe';
import { ExcludePasswordInterceptor } from './interceptors/exclude-password.interceptor';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ExcludePasswordInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId',ParseMongoIdPipe) userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch(':userId')
  update(@Param('userId',ParseMongoIdPipe) userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId',ParseMongoIdPipe) userId: string) {
    return this.usersService.remove(userId);
  }
}
