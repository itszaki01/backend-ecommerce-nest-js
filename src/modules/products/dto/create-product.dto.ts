import { Transform } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsNumber()
    @Transform(({value})=> Number(value))
    price:number

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    quantity: number;

    @IsOptional()
    imageCover: string;

    @IsMongoId()
    @IsNotEmpty()
    category: string;

    @IsMongoId({ each: true })
    @IsNotEmpty({ each: true, message: "Please select at least 1 SubCategory" })
    subCategories: string[];
}
