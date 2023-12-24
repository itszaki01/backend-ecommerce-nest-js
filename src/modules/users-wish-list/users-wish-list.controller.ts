import { ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Post, UseInterceptors } from "@nestjs/common";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { _User } from "../users/decorators/user.decorator";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { User } from "../users/schema/users.schema";
import { UsersService } from "../users/users.service";
import { Auth } from "../auth/decorators/auth.decorator";
import { ProductsService } from "../products/products.service";

@Controller("users-wish-list")
@UseInterceptors(ClassSerializerInterceptor)
@Auth("user")
export class UsersWishListController {
    constructor(
        private readonly usersServices: UsersService,
        private readonly productsService: ProductsService
    ) {}
    @Get()
    async getMyWishes(@_User() { _id }: User & { _id: string }): Promise<UserResponseDto> {
        const user = await this.usersServices.findOne(_id);
        if (user.wishList.length < 1) throw new NotFoundException("No Wishes found");

        return new UserResponseDto({ wishList: user.wishList } as any);
    }

    @Post(":productId")
    async addWish(@_User() { _id }: User & { _id: string }, @Param("productId", ParseMongoIdPipe) productId: string): Promise<UserResponseDto> {
        //1:Check if Product is Exist
        await this.productsService.findOne(productId);

        //2: Add Product to wishList
        const user = await this.usersServices.update(_id, { $addToSet: { wishList: productId } } as any);

        return new UserResponseDto(user);
    }

    @Delete(":wishId")
    async removeWish(@Param("wishId", ParseMongoIdPipe) wishId: string, @_User() { _id }: User & { _id: string }) {
        //1:Get user
        let user = await this.usersServices.findOne(_id);

        //2:Check wisth list
        if (user.wishList.length < 1) throw new NotFoundException("No Wishes found");
        const wishIndex = user.wishList.findIndex((wish) => String(wish) == wishId);
        if (wishIndex == -1) throw new NotFoundException(`No Wish found for this id ${wishId}`);

        //3:Remove
        user = await this.usersServices.update(_id, { $pull: { wishList: wishId } } as any);
        return { message: "Wish Removed Successfuly" };
    }
}
