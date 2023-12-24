import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CartsService } from "./carts.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { _User } from "../users/decorators/user.decorator";
import { User } from "../users/schema/users.schema";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";

@Controller("carts")
@Auth("user")
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @Post()
    create(@Body() createCartDto: CreateCartDto, @_User() user: { _id: string }) {
        //assign user to create dto
        createCartDto.user = user._id.toString();
        return this.cartsService.create(createCartDto);
    }

    @Get()
    findOne(@_User() user: User & { _id: string }) {
        return this.cartsService.findOne(user._id.toString());
    }

    @Patch("apply-coupoon")
    async applyCoupon(@_User() user: User & { _id: string }, @Body("couponCode") couponCode: string) {
        return this.cartsService.applyCoupon(user._id.toString(), couponCode);
    }

    @Patch(":cartItemId")
    updateQuanitiy(@Param("cartItemId",ParseMongoIdPipe) cartItemId: string, @Body() updateCartDto: UpdateCartDto, @_User() user: { _id: string }) {
        updateCartDto.user = user._id.toString();
        return this.cartsService.update(cartItemId, updateCartDto);
    }

    @Delete(":cartIdItemId")
    removeCartItem(@Param("cartIdItemId",ParseMongoIdPipe) cartIdItemId: string, @_User() user: { _id: string }) {
        return this.cartsService.removeCartItem(cartIdItemId, user._id);
    }
}
