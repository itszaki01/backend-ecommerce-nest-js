import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import * as factory from "../../utils/handlersFactory";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "./schema/category.schema";
import { Model } from "mongoose";
@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}
    async create(createCategoryDto: CreateCategoryDto) {
        return await factory.create(this.categoryModel, createCategoryDto);
    }

    async findAll() {
        return await factory.findAll(this.categoryModel);
    }

    async findOne(id: string) {
        return await factory.findOne(this.categoryModel, id);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return await factory.update(this.categoryModel, id, updateCategoryDto);
    }

    async remove(id: string) {
        return await factory.remove(this.categoryModel, id);
    }
}
