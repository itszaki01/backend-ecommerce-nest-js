import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProductsReviewsService } from "./products-reviews.service";
import { CreateProductsReviewDto } from "./dto/create-products-review.dto";
import { UpdateProductsReviewDto } from "./dto/update-products-review.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { CheckProductIsExistPipe } from "../products/pipes/check-product-is-exist.pipe";
import { User } from "../users/schema/users.schema";
import { _User } from "../users/decorators/user.decorator";

@Controller("products-reviews")
export class ProductsReviewsController {
    constructor(private readonly productsReviewsService: ProductsReviewsService) {}

    @Auth("user")
    @Post()
    create(@Body(CheckProductIsExistPipe) createProductsReviewDto: CreateProductsReviewDto, @_User() user: User & { _id: string }) {
        createProductsReviewDto.user = user._id.toString();
        return this.productsReviewsService.create(createProductsReviewDto);
    }

    @Get()
    findAll() {
        return this.productsReviewsService.findAll();
    }

    @Get(":reviewId")
    findOne(@Param("reviewId") reviewId: string) {
        return this.productsReviewsService.findOne(reviewId);
    }

    @Auth("user")
    @Patch(":reviewId")
    update(@Param("reviewId") reviewId: string, @Body() updateProductsReviewDto: UpdateProductsReviewDto, @_User() user: User & { _id: string }) {
        return this.productsReviewsService.update(reviewId, updateProductsReviewDto, user._id.toString());
    }

    @Auth("user")
    @Delete(":reviewId")
    async remove(@Param("reviewId") reviewId: string, @_User() user: User & { _id: string }) {
        return await this.productsReviewsService.remove(reviewId, user._id.toString());
    }
}
