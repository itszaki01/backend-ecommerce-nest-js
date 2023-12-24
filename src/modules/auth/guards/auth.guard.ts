import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { TokenService } from "src/common/services/token.service";
import { UsersService } from "src/modules/users/users.service";
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        // private readonly configSrevice: ConfigService<IEnv>,
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        //1: Get Token and Req
        const req = context.switchToHttp().getRequest<Request>() as unknown as Request & { user: object };
        const token = req.header("Authorization")?.split(" ")[1];

        //2:Validate Token
        if (!token) {
            throw new BadRequestException("No token found to access this route");
        }
        const decoded = this.tokenService.verify(token);

        //3:Get user assigned to the token
        const user = await this.usersService.findOne(decoded.userId);
        
        //4:Check if password is chenged after token is assigned
        if(user.passwordChangedAt.getTime() > (decoded.iat * 1000) + 60000 ){
          throw new BadRequestException('Your password is changed recently please login again.')
        }

        //5:Assign User to Requset
        req.user = user;

        return true;
    }
}
