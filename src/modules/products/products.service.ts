import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import * as factory from "../../utils/handlersFactory";
import { Product } from "./schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoriesService } from "../categories/categories.service";
import { SubCategoriesService } from "../sub-categories/sub-categories.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private ProductModel: Model<Product>,
        private readonly categoriesService: CategoriesService,
        private readonly subCategoriesService: SubCategoriesService
    ) {}

    async create(createProductDto: CreateProductDto) {
        const { category, subCategories } = createProductDto;
        //1:Validate Category is Exist
        await this.categoriesService.findOne(category);
        //2:Validate SubCategories is They Exist
        if (subCategories.length >= 1) {
            const subCategoriesArray = await Promise.all(
                subCategories.map(async (SubCategoryId) => {
                    return await this.subCategoriesService.findOne(SubCategoryId);
                })
            );
            //2.1: Check is SubCtegories belong the Category
            subCategoriesArray.map((subCategory) => {
                if (subCategory.category.toString() !== category) {
                    throw new BadRequestException(`SubCategory (${subCategory._id}) is not belong Category (${category})`);
                }
            });
        }

        //3:Careate
        return "check";
        return await factory.create(this.ProductModel, createProductDto);
    }

    async findAll() {
        return await factory.findAll(this.ProductModel);
    }

    async findOne(id: string) {
        return await factory.findOne(this.ProductModel, id);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        return await factory.update(this.ProductModel, id, updateProductDto);
    }

    async remove(id: string) {
        return await factory.remove(this.ProductModel, id);
    }
}
