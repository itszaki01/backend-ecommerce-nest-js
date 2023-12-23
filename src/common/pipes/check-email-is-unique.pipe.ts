import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class CheckEmailIsUniquePipe implements PipeTransform {
    constructor(private readonly usersService: UsersService) {}
    async transform(value: { email: string }) {
        if (value.email) {
            //1:Check Email if Already Exist
            const user = await this.usersService.findOne({ email: value.email }, "payload");
            //2:If Exist Throw Exception
            if (user) {
                throw new BadRequestException(`This Email ${value.email} is already exist`);
            }
        }
        return value;
    }
}
