import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCouponDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsNumber()
    discount: number;
    
    @IsDateString()
    @IsNotEmpty()
    expireAt: Date;
}
