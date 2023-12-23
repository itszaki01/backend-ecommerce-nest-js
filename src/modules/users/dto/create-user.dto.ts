import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { AddAddressDto } from "./add-address.dto";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;

    @IsOptional()
    @IsString()
    profileImg: string;

    @IsPhoneNumber()
    @IsString()
    @IsOptional()
    phone: string;

    @IsEmpty()
    passwordChangedAt: Date;

    @IsEmpty()
    addresses:AddAddressDto[]
}
