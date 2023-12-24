import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Cart } from "./schema/cart.schema";
import { Model } from "mongoose";
import { ProductsService } from "../products/products.service";
import { CouponsService } from "../coupons/coupons.service";
@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart.name) private cartsModel: Model<Cart>,
        private readonly porudctsService: ProductsService,
        private readonly couponService: CouponsService
    ) {}

    async create(createCartDto: CreateCartDto) {
        //Get Product in cart
        const product = await this.porudctsService.findOne(createCartDto.product);

        //if user dont have a cart -> create one
        let userCart = await this.cartsModel.findOne({ user: createCartDto.user });

        if (!userCart) {
            userCart = await this.cartsModel.create({
                cartItems: [
                    {
                        product: createCartDto.product,
                        quantity: createCartDto.quantity,
                        price: product.price,
                    },
                ],
                user: createCartDto.user,
            });
        } else {
            //If (product already in cart) throw error product already in cart || else push porduct to cart
            const porductIndex = userCart.cartItems.findIndex(
                (cartItem) => (cartItem.product.toString() as unknown as string) === createCartDto.product
            );
            if (porductIndex > -1) throw new BadRequestException("This Product is already in the cart");

            userCart.cartItems.push({
                //@ts-expect-error Product type
                product: createCartDto.product,
                quantity: createCartDto.quantity,
                price: product.price,
            });
        }

        //Calculate Total
        userCart.totalCartItemsPrice = userCart.cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
        if (userCart.totalCartItemsPriceAfterDiscount) userCart.totalCartItemsPriceAfterDiscount = 0;
        await userCart.save();

        return userCart;
    }

    async findOne(userId: string) {
        const userCart = await this.cartsModel.findOne({ user: userId });
        if (!userCart) throw new NotFoundException("No Cart found for this user");
        return userCart;
    }

    async update(cartItemId: string, updateCartDto: UpdateCartDto) {
        //1:Get User Cart and Check if item is Exist
        const userCart = await this.cartsModel.findOne({ user: updateCartDto.user });
        if (!userCart) throw new NotFoundException("No Cart found for this user");

        const cartItemIndex = userCart.cartItems.findIndex((cartItem) => {
            const _cartItem = cartItem as unknown as { _id: string };
            return _cartItem._id.toString() === cartItemId;
        });
        if (cartItemIndex === -1) throw new BadRequestException("No cart item found");

        //2:Update Quantity and recalculate total
        userCart.cartItems[cartItemIndex].quantity = updateCartDto.quantity;

        userCart.totalCartItemsPrice = userCart.cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
        if (userCart.totalCartItemsPriceAfterDiscount) userCart.totalCartItemsPriceAfterDiscount = 0;
        await userCart.save();

        return userCart;
    }

    async removeCartItem(cartItemId: string, userId?: string) {
        //1:Get User Cart and Check if item is Exist
        const userCart = await this.cartsModel.findOne({ user: userId });
        if (!userCart) throw new NotFoundException("No Cart found for this user");

        const cartItemIndex = userCart.cartItems.findIndex((cartItem) => cartItem._id.toString() === cartItemId);
        if (cartItemIndex === -1) throw new BadRequestException("No cart item found");

        //2:DeleteItem and recalculate total
        userCart.cartItems = userCart.cartItems.filter((cartItem) => cartItem._id != cartItemId);

        userCart.totalCartItemsPrice = userCart.cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
        await userCart.save();
        return userCart;
    }

    async remove(cartItemId: string) {
        //1:Get User Cart and Check if item is Exist
        const userCart = await this.cartsModel.findByIdAndDelete(cartItemId);
        if (!userCart) throw new NotFoundException("No Cart found for this user");
    }

    async applyCoupon(userId: string, couponCode: string) {
        //1: Get user cart total
        const userCart = await this.cartsModel.findOne({ user: userId });
        if (!userCart) throw new NotFoundException("No Cart found for this user");

        //2: Get coupon
        const coupon = await this.couponService.findOne({ code: couponCode }, "payload");
        if (!coupon) throw new NotFoundException("Invalid Or Wrong Coupon Code");

        //3: Check if coupon is not Expired
        if (new Date(Date.now()) > coupon.expireAt) throw new BadRequestException("Expired Coupon Code");

        //4:Calculate and edit price
        const rate = 0.01 * coupon.discount;
        const discountAmount = rate * userCart.totalCartItemsPrice;
        userCart.totalCartItemsPriceAfterDiscount = userCart.totalCartItemsPrice - discountAmount;

        await userCart.save();
        return userCart;
    }
}
