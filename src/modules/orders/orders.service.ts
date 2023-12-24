import { Injectable, NotFoundException } from "@nestjs/common";
import * as factory from "../../utils/handlersFactory";
import { CartsService } from "../carts/carts.service";
import { InjectModel } from "@nestjs/mongoose";
import { UserOrder } from "./schema/order.schema";
import { Model } from "mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UsersService } from "../users/users.service";
@Injectable()
export class OrdersService {
    constructor(
        private readonly cartsSerevice: CartsService,
        @InjectModel(UserOrder.name) private orderModel: Model<UserOrder>,
        private readonly usersService: UsersService
    ) {}

    async create(userId: string, createOrderDto: CreateOrderDto) {
        //1: Get User Cart
        const userCart = await this.cartsSerevice.findOne(userId);

        //2:Get UserAddress
        const user = await this.usersService.findOne(userId);
        const shippingAddress = user.addresses.find((address) => address._id.toString() === createOrderDto.address);
        if (!shippingAddress) throw new NotFoundException("Shipping Address not found");
        //3:Create order
        const orderPrice = userCart.totalCartItemsPriceAfterDiscount ? userCart.totalCartItemsPriceAfterDiscount : userCart.totalCartItemsPrice;

        const order = await this.orderModel.create({
            user: userId,
            totalOrderPrice: orderPrice,
            cartItems: userCart.cartItems,
            address: shippingAddress,
        });

        //4: remove cart
        await this.cartsSerevice.remove(userCart._id.toString())
        return order
    }

    async findAllMyOrders(filterObj?: object) {
        const orders = await factory.findAll(this.orderModel, filterObj);
        if (orders.length < 1) throw new NotFoundException("No orders found");
        return orders;
    }

    async findAll() {
        return await factory.findAll(this.orderModel);
    }

    async findOne(id: string) {
        return await factory.findOne(this.orderModel, id);
    }

    async remove(id: string) {
        return await factory.remove(this.orderModel, id);
    }
}
