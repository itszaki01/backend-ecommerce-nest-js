import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot("mongodb+srv://itszacktouil:sgnFDaWq1LI39HUi@cluster0.fwjhvxt.mongodb.net/nestNotaty"),
    ],
})
export class MongoModule {}
