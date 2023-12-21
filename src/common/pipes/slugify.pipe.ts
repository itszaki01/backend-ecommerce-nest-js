import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import slugify from "slugify";

@Injectable()
export class SlugifyPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(value: any, metadata: ArgumentMetadata) {
      if (value?.title) value.slug = slugify(value.title);
      if (value?.name) value.slug = slugify(value.name);
      console.log(value);
      return value;
    }
}
