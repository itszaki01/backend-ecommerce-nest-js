import { Controller, Post, Body, UsePipes, UseInterceptors, ClassSerializerInterceptor, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { CheckEmailIsUniquePipe } from "src/common/pipes/check-email-is-unique.pipe";
import { CheckPasswordIsMatchPipe } from "src/common/pipes/check-password-is-match.pipe";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import { UserResponseDto } from "../users/dto/user-response.dto";
import { ForgotPasswordDto } from "./dto/forget-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post("signup")
    @UsePipes(CheckEmailIsUniquePipe, CheckPasswordIsMatchPipe)
    async signUp(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.authService.signUp(createUserDto);
        return new UserResponseDto(user);
    }

    @Post("signin")
    async signIn(@Body() signInUserDto: SignInUserDto): Promise<UserResponseDto> {
        const user = await this.authService.signIn(signInUserDto);
        return new UserResponseDto(user);
    }

    @Post("forgot-password")
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return await this.authService.forgotPassword(forgotPasswordDto);
    }

    @Post("reset-password")
    async resetPassword(@Query('token') token: string,@Body(CheckPasswordIsMatchPipe) resetPasswordDto:ResetPasswordDto) {
        return await this.authService.resetPassword({...resetPasswordDto,token});
    }
}
