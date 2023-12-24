import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCartDto extends PartialType(CreateCartDto) {
    @IsEmpty()
    user:string

    @IsEmpty()
    product:string

    @IsNumber()
    @IsNotEmpty()
    @Transform(({value})=> Number(value))
    quantity:number

    @IsEmpty()
    totalCartItemsPrice:number
}
