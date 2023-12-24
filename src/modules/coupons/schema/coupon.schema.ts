import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CouponDocument = HydratedDocument<Coupon>;

@Schema({ timestamps: true })
export class Coupon {
    @Prop({ required: true, uppercase: true, unique: true })
    code: string;

    @Prop({ required: true })
    discount: number;

    @Prop({ required: true })
    expireAt: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
