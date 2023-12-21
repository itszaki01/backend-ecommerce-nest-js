import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "src/modules/categories/schema/category.schema";
import { SubCategory } from "src/modules/sub-categories/schema/sub-category.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({
        required: [true, "Title is requires"],
        minlength: [5, "Title should be more then 5 charachters"],
    })
    title: string;

    @Prop({ required: [true, "Slug is required"] })
    slug: string;

    @Prop({
        required: [true, "discreption is requires"],
        minlength: [5, "Description should be more then 5 charachters"],
    })
    description: string;

    @Prop({ required: [true, "Quanitity is required"] })
    quantity: number;

    @Prop({ default: 0 })
    sold: number;

    @Prop()
    imageCover: string;

    @Prop()
    images: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    category: Category;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: SubCategory.name }] })
    subCategories: SubCategory[];

    @Prop({ default: 0 })
    ratingAvarege: number;

    @Prop({ default: 0 })
    ratingQuantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
