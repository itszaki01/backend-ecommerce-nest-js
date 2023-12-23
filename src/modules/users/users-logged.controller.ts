import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Patch, UseInterceptors } from "@nestjs/common";
import { CheckPasswordIsMatchPipe } from "src/common/pipes/check-password-is-match.pipe";
import { Auth } from "../auth/decorators/auth.decorator";
import { _User } from "./decorators/user.decorator";
import { ChangeMyPasswordDto } from "./dto/change-my-passwoed.dto";
import { UserResponseDto } from "./dto/user-response.dto";
import { User } from "./schema/users.schema";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt";
import { CheckEmailIsUniquePipe } from "src/common/pipes/check-email-is-unique.pipe";
import { UpdateMeDto } from "./dto/update-me.dto";
import { TokenService } from "src/common/services/token.service";
import { mongoObjParse } from "src/utils/mongoObjParser";
("../../utils/mongoObjParser");
@Controller("me")
@Auth("all")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersLoggedController {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService
    ) {}

    @Get()
    async getMyProfile(@_User() { _id: userId }: User & { _id: string }): Promise<UserResponseDto> {
        const user = await this.usersService.findOne(userId);
        return new UserResponseDto(user);
    }

    @Patch()
    async updateMyProfile(
        @_User() { _id: userId }: User & { _id: string },
        @Body(CheckEmailIsUniquePipe) updateMeDto: UpdateMeDto
    ): Promise<UserResponseDto> {
        const user = await this.usersService.update(userId.toString(), updateMeDto);
        return new UserResponseDto(user);
    }

    @Patch("changeMyPassword")
    async changeMyPassword(
        @_User() { _id, password }: User & { _id: string },
        @Body(CheckPasswordIsMatchPipe) changeMyPasswordDto: ChangeMyPasswordDto
    ): Promise<UserResponseDto> {
        //1:Verify CurrentPassword isMatch
        const isMatch = await bcrypt.compare(changeMyPasswordDto.currentPassword, password);
        if (!isMatch) throw new BadRequestException("Current password is not correct");

        //2:UpdatePassword
        const user = await this.usersService.update(_id, {
            password: await bcrypt.hash(changeMyPasswordDto.password, 12),
            passwordChangedAt: new Date(Date.now()),
        });

        //3:Generate New Token and assign it to user
        const payload = {
            userId: _id,
        };
        const token = this.tokenService.sign(payload);
        return new UserResponseDto({ ...user['_doc'], token } as any);
    }
}
