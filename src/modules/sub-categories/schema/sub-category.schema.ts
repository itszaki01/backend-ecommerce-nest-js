import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "src/modules/categories/schema/category.schema";
import { User } from "src/modules/users/schema/users.schema";

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {
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

    @Prop({ required: [true, "Category is required"], type: mongoose.Schema.Types.ObjectId, ref: User.name })
    category: Category;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
