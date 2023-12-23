import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { IEnv } from "./interfaces/env.interface";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService<IEnv>) => ({
                uri: configService.get("DB_URI", { infer: true }),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class MongoModule {}
