import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { ValidateCategoryPipe } from "src/common/pipes/validate-category.pipe";
import { ValidateSubCategoriesPipe } from "src/common/pipes/validate-sub-categories.pipe";
import { ValidateOneImagePipe } from "src/common/pipes/validate-one-image.pipe";
import { Auth } from "../auth/decorators/auth.decorator";
import { _User } from "../users/decorators/user.decorator";
import { ProductsReviewsService } from "../products-reviews/products-reviews.service";
import { CreateProductsReviewDto } from "../products-reviews/dto/create-products-review.dto";
import { User } from "../users/schema/users.schema";

@UsePipes(ValidateCategoryPipe, ValidateSubCategoriesPipe)
@Controller("products")
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly productReviewsService: ProductsReviewsService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor("imageCover"))
    async create(@Body() createProductDto: CreateProductDto, @UploadedFile(new ValidateOneImagePipe("create")) imageCover: Express.Multer.File) {
        return this.productsService.create(createProductDto, imageCover);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    // Neasted Routes (Reviews)
    @Get(":productId/products-reviews")
    getProductReviews(@Param("productId", ParseMongoIdPipe) productId: string) {
        return this.productReviewsService.findAll({ product: productId });
    }

    @Post(":productId/products-reviews")
    @Auth("user")
    async createReviewForProduct(@Body() createReviewDto: CreateProductsReviewDto, @_User() user: User & { _id: string }) {
        createReviewDto.user = String(user._id);
        return await this.productReviewsService.create(createReviewDto);
    }

    @Get(":productId")
    findOne(@Param("productId", ParseMongoIdPipe) productId: string) {
        return this.productsService.findOne(productId);
    }

    @Patch(":productId")
    @UseInterceptors(FileInterceptor("imageCover"))
    async update(
        @Param("productId", ParseMongoIdPipe) productId: string,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile(new ValidateOneImagePipe("update")) imageCover: Express.Multer.File
    ) {
        return this.productsService.update(productId, updateProductDto, imageCover);
    }

    @Delete(":productId")
    remove(@Param("productId", ParseMongoIdPipe) productId: string) {
        return this.productsService.remove(productId);
    }
}
