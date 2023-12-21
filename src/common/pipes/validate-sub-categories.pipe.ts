import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { SubCategoriesService } from "src/modules/sub-categories/sub-categories.service";
import { parseArray } from "src/utils/parseArray";

@Injectable()
export class ValidateSubCategoriesPipe implements PipeTransform {
    constructor(private readonly subCategoriesService: SubCategoriesService) {}
    async transform(value: any) {
        if (value?.subCategories) {
            // Parse SubCategories Always to array
            const parsedSubCategories = parseArray(value.subCategories);
            value.subCategories = parsedSubCategories; //Assign Value to the request

            // Validate isSubCategories isExist
            const subCategories = await Promise.all(
                parsedSubCategories.map(async (subCategoryId) => {
                    return await this.subCategoriesService.findOne(subCategoryId);
                })
            );

            // Check if SubCategories is belong Category
            subCategories.map((subCategory) => {
                if (subCategory.category.toString() !== value.category) {
                    throw new BadRequestException(`SubCategory (${subCategory._id}) is not belong Category (${value.category})`);
                }
            });
        }
        return value;
    }
}
