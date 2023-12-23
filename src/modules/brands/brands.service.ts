import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import * as factory from "../../utils/handlersFactory";
import { InjectModel } from "@nestjs/mongoose";
import { Brand } from "./schema/brand.schema";
import { Model } from "mongoose";
@Injectable()
export class BrandsService {
    constructor(@InjectModel(Brand.name) private readonly BrandModel: Model<Brand>) {}
    
    async create(createBrandDto: CreateBrandDto) {
        return await factory.create(this.BrandModel, createBrandDto);
    }

    async findAll() {
        return await factory.findAll(this.BrandModel);
    }

    async findOne(id: string) {
        return await factory.findOne(this.BrandModel, id);
    }

    async update(id: string, updateBrandDto: UpdateBrandDto) {
        return await factory.update(this.BrandModel, id, updateBrandDto);
    }

    async remove(id: string) {
        return await factory.remove(this.BrandModel, id);
    }
}
