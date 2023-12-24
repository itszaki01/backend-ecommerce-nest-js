import { Module } from '@nestjs/common';
import { UsersLoggedinService } from './users-loggedin.service';
import { UsersLoggedinController } from './users-loggedin.controller';

@Module({
  controllers: [UsersLoggedinController],
  providers: [UsersLoggedinService],
})
export class UsersLoggedinModule {}
