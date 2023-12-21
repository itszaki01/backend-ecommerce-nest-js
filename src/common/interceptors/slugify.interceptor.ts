import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import slugify from "slugify";

@Injectable()
export class SlugifyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>();
        // try {
            if (req.body.name) {
                req.body.slug = slugify(req.body.name);
                // if (typeof req.body.name === "string") {
                // } else {
                //     throw new BadRequestException("Name must be a string type");
                // }
            }
            if (req.body.title) {
                req.body.slug = slugify(req.body.title);
                // if (typeof req.body.title === "string") {
                // } else {
                //     throw new BadRequestException("Title must be a string type");
                // }
            }
        // } catch (error) {
        //     throw new BadRequestException('Problem in slug')
        // }
        return next.handle();
    }
}
