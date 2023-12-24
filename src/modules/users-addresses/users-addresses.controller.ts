import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { _User } from "../users/decorators/user.decorator";
import { User } from "../users/schema/users.schema";
import { Auth } from "../auth/decorators/auth.decorator";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { CreateUsersAddressDto } from "./dto/create-users-address.dto";
import { UpdateUsersAddressDto } from "./dto/update-users-address.dto";

@Controller("users-addresses")
@UseInterceptors(ClassSerializerInterceptor)
@Auth("user")
export class UsersAddressesController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  async getMyAddresses(@_User() { _id }: User & { _id: string }): Promise<UserResponseDto> {
      const user = await this.usersServices.findOne(_id);
      if (user.addresses.length < 1) throw new NotFoundException("No Addresses found");
      return new UserResponseDto({ addresses: user.addresses } as any);
  }

  @Post()
  async addAddress(@_User() { _id }: User & { _id: string }, @Body() createUsersAddressDto: CreateUsersAddressDto): Promise<UserResponseDto> {
      const user = await this.usersServices.update(_id, { $addToSet: { addresses: createUsersAddressDto } } as any);
      return new UserResponseDto(user);
  }

  @Patch(":addressId")
  async updateAddress(
      @Param("addressId", ParseMongoIdPipe) addressId: string,
      @_User() { _id }: User & { _id: string },
      @Body() updateUsersAddressDto: UpdateUsersAddressDto
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
      user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...updateUsersAddressDto };

      //5:save changes
      await this.usersServices.update(_id, { addresses: user.addresses });

      return new UserResponseDto(user);
  }

  @Delete(":addressId")
  async removeAddress(@Param("addressId", ParseMongoIdPipe) addressId: string, @_User() { _id }: User & { _id: string }){
      //1:Get user
      let user = await this.usersServices.findOne(_id);

      //2:Validate Address is Exist
      if (user.addresses.length < 1) throw new NotFoundException("No Addresses found");
      const addressIdx = user.addresses.findIndex((address) => String(address._id) == addressId);
      if (addressIdx == -1) throw new NotFoundException(`No Wish found for this id ${addressId}`);

      user = await this.usersServices.update(_id, { $pull: { addresses: { _id: addressId } } } as any);
      return { message: "Address Removed Successfuly" };
  }
}
