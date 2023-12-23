import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import * as factory from "../../utils/handlersFactory";
import { Product } from "./schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { uploadOneFile } from "src/utils/uploadOneFile";
import { deleteOneFile } from "src/utils/deleteOneFile";
@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private ProductModel: Model<Product>) {}

    async create(createProductDto: CreateProductDto, imageCover: Express.Multer.File) {
        const imageName = await uploadOneFile(imageCover, "products");
        createProductDto.imageCover = imageName;
        return await factory.create(this.ProductModel, createProductDto);
    }

    async findAll() {
        return await factory.findAll(this.ProductModel);
    }

    async findOne(id: string) {
        return await factory.findOne(this.ProductModel, id);
    }

    async update(id: string, updateProductDto: UpdateProductDto, imageCover: Express.Multer.File) {
        //1:check if there image to update
        if (imageCover) {
            updateProductDto.imageCover = await uploadOneFile(imageCover, "products");
            //1.1:delete old imageCover
            const product = await this.findOne(id)
            deleteOneFile(`uploads/products/${product.imageCover}`)
        }

        return await factory.update(this.ProductModel, id, updateProductDto);
    }

    async remove(id: string) {
        return await factory.remove(this.ProductModel, id);
    }
}
