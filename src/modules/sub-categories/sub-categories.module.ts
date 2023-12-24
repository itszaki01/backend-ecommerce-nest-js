import { Module, forwardRef } from "@nestjs/common";
import { SubCategoriesService } from "./sub-categories.service";
import { SubCategoriesController } from "./sub-categories.controller";
import { CategoriesModule } from "../categories/categories.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SubCategory, SubCategorySchema } from "./schema/sub-category.schema";

@Module({
    imports: [forwardRef(() => CategoriesModule), MongooseModule.forFeatureAsync([{ name: SubCategory.name, useFactory:()=>{
        const schema = SubCategorySchema
        schema.pre(/^find/,function(next){
            //@ts-expect-error This expression is not callable
            this.populate('category','name')
            next()
        })
        return schema
    }  }])],
    controllers: [SubCategoriesController],
    providers: [SubCategoriesService],
    exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
