import { IsNotEmpty, IsString } from "class-validator";

export class CreateUsersAddressDto {
    @IsNotEmpty()
    @IsString()
    alias: string;

    @IsNotEmpty()
    @IsString()
    details: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    postalCode: string;
}
