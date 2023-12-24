import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateProductsReviewDto } from "./dto/create-products-review.dto";
import { UpdateProductsReviewDto } from "./dto/update-products-review.dto";
import * as factory from "../../utils/handlersFactory";
import { InjectModel } from "@nestjs/mongoose";
import { ProductReview } from "./schema/products-review.schema";
import { Model } from "mongoose";
@Injectable()
export class ProductsReviewsService {
    constructor(@InjectModel(ProductReview.name) private productReviewModel: Model<ProductReview>) {}
    async create(createProductsReviewDto: CreateProductsReviewDto) {
        return await factory.create(this.productReviewModel, createProductsReviewDto);
    }

    async findAll(filterObj?: object) {
        return await factory.findAll(this.productReviewModel, filterObj);
    }

    async findOne(reviewId: string) {
        return await factory.findOne(this.productReviewModel, reviewId);
    }

    async update(reviewId: string, updateProductsReviewDto: UpdateProductsReviewDto, userId: string) {
        //1:Check if the Logged User is the owner of the review
        const reviewObj = await factory.findOne(this.productReviewModel, reviewId);
        if (!reviewObj) throw new NotFoundException("The review not found");
        if (reviewObj.user.toString() !== userId) throw new UnauthorizedException("You dont have the access to edit this review");

        //2:Update
        return await factory.update(this.productReviewModel, reviewId, updateProductsReviewDto);
    }

    async remove(reviewId: string, userId: string) {
        //1:Check if the Logged User is the owner of the review
        const reviewObj = await factory.findOne(this.productReviewModel, reviewId);
        if (!reviewObj) throw new NotFoundException("The review not found");
        if (reviewObj.user.toString() !== userId) throw new UnauthorizedException("You dont have the access to edit this review");

        //2:Remove
        return await factory.remove(this.productReviewModel, reviewId);
    }
}
