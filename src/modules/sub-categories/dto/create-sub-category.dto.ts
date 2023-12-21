import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateSubCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsNotEmpty()
    @IsMongoId()
    @IsString()
    category: string
}

