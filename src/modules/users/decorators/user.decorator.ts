import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User as UserSchema } from "../schema/users.schema";

export const _User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserSchema;
});


