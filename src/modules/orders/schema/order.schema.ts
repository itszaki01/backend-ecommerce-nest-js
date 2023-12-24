import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/modules/products/schema/product.schema";
import { User } from "src/modules/users/schema/users.schema";

export type UserOrderDocument = HydratedDocument<UserOrder>;

@Schema({ timestamps: true })
export class UserOrder {
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

    @Prop({
        type: {
            alias: "string",
            details: "string",
            phone: "string",
            city: "string",
            postalCode: "string",
        },
    })
    address: {
        _id: string;
        alias: string;
        details: string;
        phone: string;
        city: string;
        postalCode: string;
    };
    @Prop({required:true , type:mongoose.Schema.Types.ObjectId,ref: User.name})
    user: User;

    @Prop({required:true})
    totalOrderPrice: number;

}

export const UserOrderSchema = SchemaFactory.createForClass(UserOrder);
