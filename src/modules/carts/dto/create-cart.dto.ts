import { IsEmpty, IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateCartDto {

    @IsEmpty()
    user:string

    @IsMongoId()
    @IsNotEmpty()
    product:string

    @IsNumber()
    @IsOptional()
    quantity:number

    @IsEmpty()
    totalCartItemsPrice:number
}
