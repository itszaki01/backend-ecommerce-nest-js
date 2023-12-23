import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from "@nestjs/common";
import { SubCategoriesService } from "./sub-categories.service";
import { CreateSubCategoryDto } from "./dto/create-sub-category.dto";
import { UpdateSubCategoryDto } from "./dto/update-sub-category.dto";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { ValidateCategoryPipe } from "src/common/pipes/validate-category.pipe";

@UsePipes(ValidateCategoryPipe)
@Controller("sub-categories")
export class SubCategoriesController {
    constructor(private readonly subCategoriesService: SubCategoriesService) {}

    @Post()
    create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
        return this.subCategoriesService.create(createSubCategoryDto);
    }

    @Get()
    findAll() {
        return this.subCategoriesService.findAll();
    }

    @Get(":SubCategoryId")
    findOne(@Param("SubCategoryId", ParseMongoIdPipe) SubCategoryId: string) {
        return this.subCategoriesService.findOne(SubCategoryId);
    }

    @Patch(":SubCategoryId")
    update(@Param("SubCategoryId", ParseMongoIdPipe) SubCategoryId: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
        return this.subCategoriesService.update(SubCategoryId, updateSubCategoryDto);
    }

    @Delete(":SubCategoryId")
    remove(@Param("SubCategoryId", ParseMongoIdPipe) SubCategoryId: string) {
        return this.subCategoriesService.remove(SubCategoryId);
    }
}
