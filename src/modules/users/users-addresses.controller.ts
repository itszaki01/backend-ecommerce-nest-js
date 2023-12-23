import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserResponseDto } from "./dto/user-response.dto";
import { _User } from "./decorators/user.decorator";
import { User } from "./schema/users.schema";
import { AddAddressDto } from "./dto/add-address.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("users-addresses")
@UseInterceptors(ClassSerializerInterceptor)
@Auth("user")
export class UsersAddressesController {
    constructor(private readonly usersServices: UsersService) {}

    @Get()
    async getMyAddresses(@_User() { _id }: User & { _id: string }): Promise<UserResponseDto> {
        const user = await this.usersServices.findOne(_id);
        return new UserResponseDto(user.addresses as any);
    }

    @Post()
    async addAddress(@_User() { _id }: User & { _id: string }, @Body() addAddressDto: AddAddressDto): Promise<UserResponseDto> {
        const user = await this.usersServices.update(_id, { $addToSet: { addresses: addAddressDto } } as any);
        return new UserResponseDto(user);
    }

    @Patch(":addressId")
    async updateAddress(
        @Param("addressId", ParseMongoIdPipe) addressId: string,
        @_User() { _id }: User & { _id: string },
        @Body() addAddressDto: UpdateAddressDto
    ): Promise<UserResponseDto> {
        //1:Get User
        const user = await this.usersServices.findOne(_id);

        //2:Get the index of targeted Address
        const addressIndex = user.addresses.findIndex((address) => {
            console.log(address._id.toString() == addressId);
            return address._id.toString() == addressId;
        });

        //3:check if its exist
        if (addressIndex < 0) throw new BadRequestException("Address not found");

        //5:Update it with new data
        user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...addAddressDto };

        //5:save changes
        await this.usersServices.update(_id, { addresses: user.addresses });

        return new UserResponseDto(user);
    }

    @Delete(":addressId")
    async removeAddress(@Param("addressId", ParseMongoIdPipe) addressId: string, @_User() { _id }: User & { _id: string }): Promise<UserResponseDto> {
        const user = await this.usersServices.update(_id, { $pull: { addresses: { _id: addressId } } } as any);
        return new UserResponseDto(user.addresses as any);
    }
}
