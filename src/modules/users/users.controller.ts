import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ParseMongoIdPipe } from "../mongo/pipes/parse-mongo-id.pipe";
import { CheckEmailIsUniquePipe } from "src/common/pipes/check-email-is-unique.pipe";
import { CheckPasswordIsMatchPipe } from "src/common/pipes/check-password-is-match.pipe";
import { UserResponseDto } from "./dto/user-response.dto";
import { Auth } from "../auth/decorators/auth.decorator";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
@Auth("admin")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    @UsePipes(CheckEmailIsUniquePipe, CheckPasswordIsMatchPipe)
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.usersService.create(createUserDto);
        return new UserResponseDto(user);
    }

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserResponseDto(user));
    }

    @Get(":userId")
    async findOne(@Param("userId", ParseMongoIdPipe) userId: string): Promise<UserResponseDto> {
        const user = await this.usersService.findOne(userId);
        return new UserResponseDto(user);
    }

    @Patch(":userId")
    async update(@Param("userId", ParseMongoIdPipe) userId: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.usersService.update(userId, updateUserDto);
        return new UserResponseDto(user);
    }

    @Delete(":userId")
    remove(@Param("userId", ParseMongoIdPipe) userId: string) {
        return this.usersService.remove(userId);
    }
}
