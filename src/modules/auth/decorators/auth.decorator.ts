import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";

type Roles = "admin" | "mamager" | "user";
export const Auth = (...roles: Roles[] | "all"[]) => applyDecorators(SetMetadata("roles", roles), UseGuards(AuthGuard, RoleGuard));
