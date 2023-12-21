import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { MongoModule } from "./modules/mongo/mongo.module";
import { CommonModule } from "./common/common.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { SubCategoriesModule } from "./modules/sub-categories/sub-categories.module";
import { ProductsModule } from "./modules/products/products.module";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./common/filters/global-filter.filter";

@Module({
    imports: [UsersModule, MongoModule, CommonModule, CategoriesModule, SubCategoriesModule, ProductsModule],
    providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
