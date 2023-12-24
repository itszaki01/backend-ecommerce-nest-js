import { Module } from '@nestjs/common';
import { UsersAddressesService } from './users-addresses.service';
import { UsersAddressesController } from './users-addresses.controller';

@Module({
  controllers: [UsersAddressesController],
  providers: [UsersAddressesService],
})
export class UsersAddressesModule {}
