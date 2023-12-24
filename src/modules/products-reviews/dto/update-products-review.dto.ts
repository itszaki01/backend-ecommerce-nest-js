import { PartialType } from "@nestjs/mapped-types";
import { CreateProductsReviewDto } from "./create-products-review.dto";
import { IsEmpty } from "class-validator";

export class UpdateProductsReviewDto extends PartialType(CreateProductsReviewDto) {
    @IsEmpty()
    user: string;

    @IsEmpty()
    product: string;
}
