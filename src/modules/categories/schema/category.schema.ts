import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    @Prop({
        required: [true, "Name is required"],
        trim: true,
    })
    name: string;

    @Prop({
        required: [true, "Slug is required"],
        trim: true,
        lowercase: true,
    })
    slug: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
