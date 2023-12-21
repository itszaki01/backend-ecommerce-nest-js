import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmpty({message:'Please use /resetpassword to change your password'})
    override password?: string;
}
