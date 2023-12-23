import { Exclude } from "class-transformer";
import { mongoObjParse } from "src/utils/mongoObjParser";

export class UserResponseDto {
    @Exclude()
    password: string;
    @Exclude()
    passwordChangedAt: Date;
    constructor(partial: Partial<UserResponseDto>) {  
        Object.assign(this, mongoObjParse(partial));
    }
}
