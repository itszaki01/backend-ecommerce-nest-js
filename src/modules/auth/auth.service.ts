import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import * as bcrypt from "bcrypt";
import { mongoObjParse } from "src/utils/mongoObjParser";
import { ForgotPasswordDto } from "./dto/forget-password.dto";
import { sendEmail } from "src/utils/sendEmail";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { TokenService } from "src/common/services/token.service";
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService
    ) {}
    async signUp(createUserDto: CreateUserDto) {
        // 1:Create user
        const user = await this.usersService.create(createUserDto);

        //2:Sign a JWT
        const payload = {
            userId: user._id,
        };
        const token = this.tokenService.sign(payload);

        return {
            ...mongoObjParse(user),
            token,
        };
    }

    async signIn(signInUserDto: SignInUserDto) {
        //1: Check if User is Exist
        const user = await this.usersService.findOne({ email: signInUserDto.email }, "payload");
        if (!user) throw new BadRequestException("Wrong email or password");

        //2: Verify Password
        const isMatch = await bcrypt.compare(signInUserDto.password, user.password);
        if (!isMatch) throw new BadRequestException("Wrong email or password");

        //2:Sign a JWT
        const payload = {
            userId: user._id,
        };
        const token = this.tokenService.sign(payload);

        return {
            ...mongoObjParse(user),
            token,
        };
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        //1: Check if User is Exist
        const user = await this.usersService.findOne({ email: forgotPasswordDto.email }, "payload");
        if (!user) throw new BadRequestException("Wrong email");

        //2: Generate Token to reset password
        const payload = { userId: user._id };
        const token = this.tokenService.sign(payload, "10m");

        //3:Send Reset Link to Email
        try {
            await sendEmail({
                to: user.email,
                subject: "Reset password",
                text: `you reset link is: ?token=${token}`,
            });
        } catch (error) {
            console.log(error.message);
        }
        return { message: "email sent successfuly" };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto & { token: string }) {
        //1:Verify Token
        const decoded = this.tokenService.verify(resetPasswordDto.token)

        //3:update user Password
        await this.usersService.update(decoded.userId, {
            password: await bcrypt.hash(resetPasswordDto.password, 12),
            passwordChangedAt: new Date(Date.now()),
        });

        return {
            message: "Password Updated Successfuly",
        };
    }
}
