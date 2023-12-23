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
import { AuthModule } from './modules/auth/auth.module';
import { AdressessModule } from './modules/adressess/adressess.module';

@Module({
    imports: [
        UsersModule,
        MongoModule,
        CommonModule,
        CategoriesModule,
        SubCategoriesModule,
        ProductsModule,
        BrandsModule,
        ConfigModule.forRoot({ envFilePath: ".development.env", isGlobal: true }),
        AuthModule,
        AdressessModule,
    ],
    providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
