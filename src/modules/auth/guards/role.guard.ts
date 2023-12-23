import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const allowTo = this.reflector.getAllAndOverride<"admin" | "mamager" | "user" | "all">("roles", [context.getHandler(), context.getClass()]);

        if (allowTo.includes("all")) return true;

        const userRole = context.switchToHttp().getRequest().user.role;
        if (!allowTo.includes(userRole)) throw new UnauthorizedException("You dont have access to this route");

        return true;
    }
}
