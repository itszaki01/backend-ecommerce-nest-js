import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/modules/products/schema/product.schema";
import { User } from "src/modules/users/schema/users.schema";

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
    @Prop({
        type: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: Product.name},
                quantity: {
                    type: "number",
                    default: 1,
                },
                price: "Number",
            },
        ],
    })
    cartItems: {
        product: Product;
        quantity: number;
        price: number;
        _id:string
    }[];

    @Prop()
    totalCartItemsPrice: number;

    @Prop()
    totalCartItemsPriceAfterDiscount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
