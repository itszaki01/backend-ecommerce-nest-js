import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { CategoriesModule } from '../categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from './schema/sub-category.schema';

@Module({
  imports:[CategoriesModule,MongooseModule.forFeature([{name:SubCategory.name,schema:SubCategorySchema}])],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  exports:[SubCategoriesService]
})
export class SubCategoriesModule {}
