import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schema/product.schema";
import { CategoriesModule } from "../categories/categories.module";
import { SubCategoriesModule } from "../sub-categories/sub-categories.module";
import { UsersModule } from "../users/users.module";
import { ProductsReviewsModule } from "../products-reviews/products-reviews.module";
import { Category } from "../categories/schema/category.schema";

@Module({
    imports: [
        ProductsReviewsModule,
        UsersModule,
        CategoriesModule,
        SubCategoriesModule,
        MongooseModule.forFeatureAsync([
            {
                name: Product.name,
                useFactory: () => {
                    const schema = ProductSchema;
                    schema.pre(/^find/, function (next) {
                        //@ts-expect-error type error
                        this.populate("category");
                        //@ts-expect-error type error
                        this.populate("subCategories");
                        next();
                    });
                    return schema;
                },
            },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}
