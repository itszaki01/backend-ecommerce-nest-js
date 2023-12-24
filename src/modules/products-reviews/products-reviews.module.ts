import { Module, forwardRef } from "@nestjs/common";
import { ProductsReviewsService } from "./products-reviews.service";
import { ProductsReviewsController } from "./products-reviews.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductReview, ProductReviewSchema } from "./schema/products-review.schema";
import { ProductsModule } from "../products/products.module";

@Module({
    imports: [
        forwardRef(() => ProductsModule),
        MongooseModule.forFeatureAsync([
            {
                name: ProductReview.name,
                useFactory: () => {
                    const schema = ProductReviewSchema;
                    return schema;
                },
            },
        ]),
    ],
    controllers: [ProductsReviewsController],
    providers: [ProductsReviewsService],
    exports: [ProductsReviewsService],
})
export class ProductsReviewsModule {}
