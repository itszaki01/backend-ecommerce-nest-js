import { IsEmpty, IsMongoId, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateProductsReviewDto {
    @IsEmpty()
    user:string

    @IsMongoId()
    @IsNotEmpty()
    product: string;

    @IsString()
    descreption: string;
    
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;
}
