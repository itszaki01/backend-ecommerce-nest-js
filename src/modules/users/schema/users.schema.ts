import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/modules/products/schema/product.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true})
export class User {
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

    @Prop({
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    })
    email: string;

    @Prop({ required: [true, "Password is required"] })
    password: string;

    @Prop({ default: new Date(Date.now()) })
    passwordChangedAt: Date;

    @Prop()
    profileImg: string;

    @Prop()
    phone: string;
    @Prop({ default: "user" })
    role: "user" | "admin" | "manager";

    @Prop({
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    })
    wishList: Product[];

    @Prop({
        type: [
            {
                alias: "string",
                details: "string",
                phone: "string",
                city: "string",
                postalCode: "string",
            },
        ],
    })
    addresses: {
        _id: string;
        alias: string;
        details: string;
        phone: string;
        city: string;
        postalCode: string;
    }[];
}
export const UserSchema = SchemaFactory.createForClass(User);
