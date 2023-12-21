import { Injectable, PipeTransform } from "@nestjs/common";
import { CategoriesService } from "src/modules/categories/categories.service";

@Injectable()
export class ValidateCategoryPipe implements PipeTransform {
    constructor(private readonly categoriesService: CategoriesService) {}
    async transform(value: any) {
        if (value?.category) await this.categoriesService.findOne(value.category);
        return value;
    }
}
