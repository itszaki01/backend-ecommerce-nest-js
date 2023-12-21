import { Injectable } from "@nestjs/common";
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import * as factory from "../../utils/handlersFactory";
import { InjectModel } from "@nestjs/mongoose";
import { SubCategory } from "./schema/sub-category.schema";
import { Model } from "mongoose";
import { CategoriesService } from "../categories/categories.service";
@Injectable()
export class SubCategoriesService {
    constructor(
        @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
        private readonly categoriesService: CategoriesService
    ) {}
    async create(createSubCategoryDto: CreateSubCategoryDto) {
        //1: Check if category is exist
        await this.categoriesService.findOne(createSubCategoryDto.category);
        //2:create
        return await factory.create(this.subCategoryModel, createSubCategoryDto);
    }

    async findAll() {
        return await factory.findAll(this.subCategoryModel);
    }

    async findOne(id: string) {
        return await factory.findOne(this.subCategoryModel, id);
    }

    async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
        //1: Check if category is exist
        if (updateSubCategoryDto.category) await this.categoriesService.findOne(updateSubCategoryDto.category);
        //2:update
        return await factory.update(this.subCategoryModel, id, updateSubCategoryDto);
    }

    async remove(id: string) {
        return await factory.remove(this.subCategoryModel, id);
    }
}
