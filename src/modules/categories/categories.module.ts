import { Module, forwardRef } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schema/category.schema";
import { SubCategoriesModule } from "../sub-categories/sub-categories.module";

@Module({
    imports: [forwardRef(() => SubCategoriesModule),MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [CategoriesService],
})
export class CategoriesModule {}
