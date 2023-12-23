import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { SubCategoriesService } from "../sub-categories/sub-categories.service";
import { ValidateCategoryPipe } from "src/common/pipes/validate-category.pipe";
import { CreateNeastedSubCategoryDto } from "./dto/create-neaste-sub-category.dto";

@Controller("categories")
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly subCategoriesService: SubCategoriesService
    ) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(":categoryId")
    findOne(@Param("categoryId", ParseMongoIdPipe) categoryId: string) {
        return this.categoriesService.findOne(categoryId);
    }

    //Get SubCategories (Neasted Route)
    @Get(":categoryId/sub-categories")
    async findCategorySubCategories(@Param("categoryId", ParseMongoIdPipe, ValidateCategoryPipe) categoryId: string) {
        return this.subCategoriesService.findAll({ category: categoryId });
    }

    //Create SubCategory (Neasted Route)
    @Post(":categoryId/sub-categories")
    async createSubCategoryForCategory(
        @Param("categoryId", ParseMongoIdPipe, ValidateCategoryPipe) categoryId: string,
        @Body() createNeastedSubCategoryDto: CreateNeastedSubCategoryDto
    ) {
        createNeastedSubCategoryDto.category = categoryId;
        return this.subCategoriesService.create(createNeastedSubCategoryDto);
    }

    @Patch(":categoryId")
    update(@Param("categoryId", ParseMongoIdPipe) categoryId: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(categoryId, updateCategoryDto);
    }

    @Delete(":categoryId")
    remove(@Param("categoryId", ParseMongoIdPipe) categoryId: string) {
        return this.categoriesService.remove(categoryId);
    }
}
