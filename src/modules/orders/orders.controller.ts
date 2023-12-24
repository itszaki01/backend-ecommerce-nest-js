import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { _User } from "../users/decorators/user.decorator";
import { User } from "../users/schema/users.schema";

@Auth("admin")
@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Auth("user")
    @Post("checkout")
    create(@_User() user: User & { _id: string }, @Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(user._id.toString(), createOrderDto);
    }

    @Auth("user")
    @Get('my-orders')
    findAllMyOrders(@_User() user: User & { _id: string }) {
        return this.ordersService.findAllMyOrders({ user: user._id });
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(":orderId")
    findOne(@Param("orderId") orderId: string) {
        return this.ordersService.findOne(orderId);
    }

    @Delete(":orderId")
    remove(@Param("orderId") orderId: string) {
        return this.ordersService.remove(orderId);
    }
}
