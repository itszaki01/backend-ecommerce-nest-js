import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/users.schema";
import { Model } from "mongoose";
import * as factory from "../../utils/handlersFactory";
import { validateIsExist } from "src/utils/validateIsExist";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModal: Model<User>) {}
    async create(createUserDto: CreateUserDto) {
        //1:Validate Email is exist before
        const IsEmailExist = await validateIsExist(this.userModal, { email: createUserDto.email });
        if (IsEmailExist) throw new BadRequestException("This email is already in use");
        //2:Create User
        return await factory.create(this.userModal, createUserDto);
    }

    async findAll() {
        return await factory.findAll(this.userModal);
    }

    async findOne(id: string) {
        return await factory.findOne(this.userModal, id);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        //1:Validate Email is exist before
        const IsEmailExist = await validateIsExist(this.userModal, { email: updateUserDto.email });
        if (IsEmailExist) throw new BadRequestException("This email is already in use");
        //2:Update User 
        return await factory.update(this.userModal, id, updateUserDto);
    }

    async remove(id: string) {
        return await factory.remove(this.userModal, id);
    }
}
