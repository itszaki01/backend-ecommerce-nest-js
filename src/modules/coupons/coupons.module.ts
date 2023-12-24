import { Module } from "@nestjs/common";
import { CouponsService } from "./coupons.service";
import { CouponsController } from "./coupons.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Coupon, CouponSchema } from "./schema/coupon.schema";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }])],
    controllers: [CouponsController],
    providers: [CouponsService],
    exports:[CouponsService]
})
export class CouponsModule {}
