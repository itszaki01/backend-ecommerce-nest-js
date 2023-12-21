import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

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

    @IsOptional()
    @IsString()
    profileImg: string;

    @IsPhoneNumber()
    @IsString()
    @IsOptional()
    phone: string;

    // wishlist: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Product",
    //     },
    // ],
    
    @IsArray()
    @IsOptional()
    addresses: {
        alias: string;
        details: string;
        phone: string;
        city: string;
        postalCode: string;
    }[];
}
