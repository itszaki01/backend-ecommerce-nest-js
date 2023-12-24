import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/modules/products/schema/product.schema";
import { User } from "src/modules/users/schema/users.schema";

export type ProductReviewDocument = HydratedDocument<ProductReview>;

@Schema()
export class ProductReview {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Product.name })
    product: Product;

    @Prop()
    descreption: string;

    @Prop({ required: true })
    rating: number;
}

export const ProductReviewSchema = SchemaFactory.createForClass(ProductReview);
