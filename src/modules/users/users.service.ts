import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/users.schema";
import { Model } from "mongoose";
import * as factory from "../../utils/handlersFactory";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    async create(createUserDto: CreateUserDto) {
        return await factory.create(this.UserModel, createUserDto);
    }

    async findAll() {
        return await factory.findAll(this.UserModel);
    }

    async findOne(id: string | object, findType?: "payload") {
        return await factory.findOne(this.UserModel, id, findType);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await factory.update(this.UserModel, id, updateUserDto);
    }

    async remove(id: string) {
        return await factory.remove(this.UserModel, id);
    }
}
