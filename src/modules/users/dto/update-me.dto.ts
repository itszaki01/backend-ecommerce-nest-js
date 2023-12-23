import { PartialType } from "@nestjs/mapped-types";
import { IsEmpty } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateMeDto extends PartialType(CreateUserDto) {
    @IsEmpty({ message: 'Please use \/me\/changeMyPassword to change your password' })
    password: string;
}
