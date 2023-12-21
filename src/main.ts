import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { WarpDataInterceptor } from "./common/interceptors/warp-data.interceptor";
import { HttpExceptionsFilter } from "./common/filters/http-exceptions.filter";
import { SlugifyPipe } from "./common/pipes/slugify.pipe";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new SlugifyPipe(),new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    app.useGlobalFilters(new HttpExceptionsFilter());
    app.useGlobalInterceptors(new WarpDataInterceptor());
    //Rejection Handler
    process.on("unhandledRejection", (err: Error) => {
        console.log(
            `\n -----------------------------------------
        \n => Unhandled Error: ${err}
        \n -----------------------------------------
        \n => Message: ${err.message}
        \n -----------------------------------------
        \n => Stack ${err.stack}
        \n -----------------------------------------`
        );
    });
    await app.listen(3000);
}
bootstrap();
