import { PartialType } from '@nestjs/mapped-types';
import { CreateAdressessDto } from './create-adressess.dto';

export class UpdateAdressessDto extends PartialType(CreateAdressessDto) {}
