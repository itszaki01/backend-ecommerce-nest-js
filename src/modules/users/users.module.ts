import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/users.schema";
import * as bcrypt from "bcrypt";
import { UsersLoggedController } from "./users-logged.controller";
import { UsersWishListController } from './users-wish-list.controller';
import { UsersAddressesController } from './users-addresses.controller';
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    const schema = UserSchema;
                    schema.pre("save", async function (next) {
                        this.password = await bcrypt.hash(this.password, 12);
                        next();
                    });

                    return schema;
                },
            },
        ]),
    ],
    controllers: [UsersLoggedController,UsersController, UsersWishListController, UsersAddressesController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
