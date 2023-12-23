import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as Jwt from "jsonwebtoken";
import { IEnv } from "src/modules/mongo/interfaces/env.interface";
@Injectable()
export class TokenService {
    constructor(private readonly configService: ConfigService<IEnv>) {}

    verify(token: string) {
        return Jwt.verify(token, this.configService.get("JWT_SECRET", { infer: true })) as { userId: string; iat: number; exp: number };
    }

    sign(payload: object, ExpireTime: string = this.configService.get("JWT_EXPIRE", { infer: true })) {
       return Jwt.sign(payload, this.configService.get("JWT_SECRET", { infer: true }), { expiresIn: ExpireTime });
    }
}
