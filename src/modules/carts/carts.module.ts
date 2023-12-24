import { Module } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CartsController } from "./carts.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "./schema/cart.schema";
import { ProductsModule } from "../products/products.module";
import { CouponsModule } from "../coupons/coupons.module";

@Module({
    imports: [
        ProductsModule,
        CouponsModule,
        MongooseModule.forFeatureAsync([{ name: Cart.name, useFactory:()=>{
            const schema = CartSchema
            schema.pre(/^find/, function(next){
                //@ts-expect-error is not callable
                this.populate('cartItems.product')
                next()
            })
            return schema
        } }]),
    ],
    controllers: [CartsController],
    providers: [CartsService],
    exports:[CartsService]
})
export class CartsModule {}
