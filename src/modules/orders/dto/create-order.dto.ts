import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateOrderDto {

    @IsMongoId()
    @IsNotEmpty()
    address:string
}
