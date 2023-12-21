import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { CategoriesModule } from '../categories/categories.module';
import { SubCategoriesModule } from '../sub-categories/sub-categories.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name,schema:ProductSchema}]),CategoriesModule,SubCategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
