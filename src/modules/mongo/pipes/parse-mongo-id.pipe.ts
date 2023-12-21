import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
    transform(value: string) {
        const isValidMongoId = RegExp(/^[a-f\d]{24}$/i).test(value);
        if (!isValidMongoId) {
            throw new BadRequestException(`${value} is not valid id`);
        }
        return value;
    }
}
