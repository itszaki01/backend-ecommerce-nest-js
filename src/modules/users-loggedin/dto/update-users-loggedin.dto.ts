import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class UpdateUsersLoggedinDto extends PartialType(CreateUserDto) {
    @IsEmpty({ message: 'Please use \/me\/changeMyPassword to change your password' })
    password: string;
}
