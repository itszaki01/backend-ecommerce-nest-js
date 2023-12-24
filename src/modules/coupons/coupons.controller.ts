import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CouponsService } from "./coupons.service";
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";

@Controller("coupons")
@Auth("admin", "mamager")
export class CouponsController {
    constructor(private readonly couponsService: CouponsService) {}

    @Post()
    create(@Body() createCouponDto: CreateCouponDto) {
        return this.couponsService.create(createCouponDto);
    }

    @Get()
    findAll() {
        return this.couponsService.findAll();
    }

    @Get(":couponId")
    findOne(@Param("couponId", ParseMongoIdPipe) couponId: string) {
        return this.couponsService.findOne(couponId);
    }

    @Patch(":couponId")
    update(@Param("couponId", ParseMongoIdPipe) couponId: string, @Body() updateCouponDto: UpdateCouponDto) {
        return this.couponsService.update(couponId, updateCouponDto);
    }

    @Delete(":couponId")
    remove(@Param("couponId", ParseMongoIdPipe) couponId: string) {
        return this.couponsService.remove(couponId);
    }
}
