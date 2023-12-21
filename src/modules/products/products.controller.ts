import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseArrayPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseInterceptors(FileInterceptor("imageCover"))
    create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() imageCover: Express.Multer.File,
        @Body("subCategories", ParseArrayPipe) subCategories: string[]
    ) {
        return this.productsService.create({...createProductDto,subCategories});
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(":productId")
    findOne(@Param("productId", ParseMongoIdPipe) productId: string) {
        return this.productsService.findOne(productId);
    }

    @Patch(":productId")
    update(@Param("productId", ParseMongoIdPipe) productId: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(productId, updateProductDto);
    }

    @Delete(":productId")
    remove(@Param("productId", ParseMongoIdPipe) productId: string) {
        return this.productsService.remove(productId);
    }
}
