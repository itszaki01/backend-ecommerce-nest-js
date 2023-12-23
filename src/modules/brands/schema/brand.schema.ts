import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, lowercase: true })
    slug: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);