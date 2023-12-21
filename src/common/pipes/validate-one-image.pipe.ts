import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

type image = {
    fieldname: "imageCover" | "images";
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
};
@Injectable()
export class ValidateOneImagePipe implements PipeTransform {
    constructor(private readonly Method: "create" | "update") {}
    transform(value: image) {
        if (this.Method === "create") {
            if (!value) throw new BadRequestException(`Image field is required`);
            if (!value.mimetype.startsWith("image")) throw new BadRequestException(`${value.fieldname} must be an image file`);
        }

        if (this.Method === "update" && value) {
            if (!value.mimetype.startsWith("image")) throw new BadRequestException(`${value.fieldname} must be an image file`);
        }
        
        return value;
    }
}
