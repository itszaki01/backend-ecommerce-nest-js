import { Module } from "@nestjs/common";
import { UsersModule } from "./modules/users/users.module";
import { MongoModule } from "./modules/mongo/mongo.module";
import { CommonModule } from "./common/common.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { SubCategoriesModule } from "./modules/sub-categories/sub-categories.module";
import { ProductsModule } from "./modules/products/products.module";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { BrandsModule } from "./modules/brands/brands.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersAddressesModule } from "./modules/users-addresses/users-addresses.module";
import { UsersWishListModule } from "./modules/users-wish-list/users-wish-list.module";
import { UsersLoggedinModule } from "./modules/users-loggedin/users-loggedin.module";
import { ProductsReviewsModule } from './modules/products-reviews/products-reviews.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
    imports: [
        UsersModule,
        MongoModule,
        CommonModule,
        CategoriesModule,
        SubCategoriesModule,
        ProductsModule,
        BrandsModule,
        AuthModule,
        UsersAddressesModule,
        UsersWishListModule,
        UsersLoggedinModule,
        ConfigModule.forRoot({ envFilePath: ".development.env", isGlobal: true }),
        ProductsReviewsModule,
        CouponsModule,
        CartsModule,
        OrdersModule,
    ],
    providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
