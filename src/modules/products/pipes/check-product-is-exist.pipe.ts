import { Injectable, PipeTransform } from "@nestjs/common";
import { ProductsService } from "src/modules/products/products.service";

@Injectable()
export class CheckProductIsExistPipe implements PipeTransform {
    constructor(private readonly productsService: ProductsService) {}
    async transform(value: any) {
        if (value?.product) {
            await this.productsService.findOne(value.product);
        }
        return value;
    }
}
