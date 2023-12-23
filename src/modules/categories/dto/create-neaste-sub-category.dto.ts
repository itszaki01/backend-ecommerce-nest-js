import { IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class CreateNeastedSubCategoryDto {
    @IsNotEmpty()
    @IsString()
    name:string
    
    @IsNotEmpty()
    @IsString()
    slug:string

    @IsEmpty()
    category:string
}
