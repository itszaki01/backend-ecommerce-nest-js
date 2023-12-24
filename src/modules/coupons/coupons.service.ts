import { Injectable } from "@nestjs/common";
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";
import * as factory from "../../utils/handlersFactory";
import { InjectModel } from "@nestjs/mongoose";
import { Coupon } from "./schema/coupon.schema";
import { Model } from "mongoose";
@Injectable()
export class CouponsService {
    constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

    async create(createCouponDto: CreateCouponDto) {
        return await factory.create(this.couponModel, createCouponDto);
    }

    async findAll() {
        return await factory.findAll(this.couponModel);
    }

    async findOne(payload: string | object, filterType?: "payload") {
        return await factory.findOne(this.couponModel, payload, filterType);
    }

    async update(couponId: string, updateCouponDto: UpdateCouponDto) {
        return await factory.update(this.couponModel, couponId, updateCouponDto);
    }

    async remove(couponId: string) {
        return await factory.remove(this.couponModel, couponId);
    }
}
