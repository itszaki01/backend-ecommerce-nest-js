import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { CategoriesService } from "src/modules/categories/categories.service";

@Injectable()
export class ValidateCategoryPipe implements PipeTransform {
    constructor(private readonly categoriesService: CategoriesService) {}
    async transform(value: any,metadata: ArgumentMetadata) {
        if (value?.category) await this.categoriesService.findOne(value.category);
        if(metadata.data === 'categoryId') await this.categoriesService.findOne(value)
        return value;
    }
}
