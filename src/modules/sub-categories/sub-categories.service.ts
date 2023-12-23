import { Injectable } from "@nestjs/common";
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import * as factory from "../../utils/handlersFactory";
import { InjectModel } from "@nestjs/mongoose";
import { SubCategory } from "./schema/sub-category.schema";
import { Model } from "mongoose";

@Injectable()
export class SubCategoriesService {
    constructor(
        @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
    ) {}
    async create(createSubCategoryDto: CreateSubCategoryDto) {
        return await factory.create(this.subCategoryModel, createSubCategoryDto);
    }

    async findAll(filterObj?:object) {
        return await factory.findAll(this.subCategoryModel,filterObj);
    }

    async findOne(id: string) {
        return await factory.findOne(this.subCategoryModel, id);
    }

    async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
        return await factory.update(this.subCategoryModel, id, updateSubCategoryDto);
    }

    async remove(id: string) {
        return await factory.remove(this.subCategoryModel, id);
    }
}
