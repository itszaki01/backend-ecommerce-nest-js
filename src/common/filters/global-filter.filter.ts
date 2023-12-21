import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: Error, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        let responseBody = {};
        if (process.env.NODE_ENV.startsWith("DEV")) {
            if (exception instanceof HttpException) {
                responseBody = {
                    ...(exception.getResponse() as object),
                    timestamp: new Date().toISOString(),
                    path: httpAdapter.getRequestUrl(ctx.getRequest()),
                    stack: exception.stack,
                };
            } else {
                responseBody = {
                    message: exception.message,
                    statusCode: httpStatus,
                    timestamp: new Date().toISOString(),
                    path: httpAdapter.getRequestUrl(ctx.getRequest()),
                    stack: exception.stack,
                };
            }
        } else {
            if (exception instanceof HttpException) {
                responseBody = {
                    ...(exception.getResponse() as object),
                    timestamp: new Date().toISOString(),
                    path: httpAdapter.getRequestUrl(ctx.getRequest()),
                };
            } else {
                responseBody = {
                    message: exception.message,
                    statusCode: httpStatus,
                    timestamp: new Date().toISOString(),
                    path: httpAdapter.getRequestUrl(ctx.getRequest()),
                };
            }
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
