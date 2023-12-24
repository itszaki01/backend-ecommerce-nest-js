import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersAddressDto } from './create-users-address.dto';

export class UpdateUsersAddressDto extends PartialType(CreateUsersAddressDto) {}
