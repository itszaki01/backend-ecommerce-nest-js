import { Injectable } from '@nestjs/common';
import { CreateAdressessDto } from './dto/create-adressess.dto';
import { UpdateAdressessDto } from './dto/update-adressess.dto';

@Injectable()
export class AdressessService {
  create(createAdressessDto: CreateAdressessDto) {
    return 'This action adds a new adressess';
  }

  findAll() {
    return `This action returns all adressess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adressess`;
  }

  update(id: number, updateAdressessDto: UpdateAdressessDto) {
    return `This action updates a #${id} adressess`;
  }

  remove(id: number) {
    return `This action removes a #${id} adressess`;
  }
}
