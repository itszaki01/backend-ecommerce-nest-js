import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "@nestjs/config";

import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/schema/users.schema";

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
