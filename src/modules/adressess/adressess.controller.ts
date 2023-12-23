import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdressessService } from './adressess.service';
import { CreateAdressessDto } from './dto/create-adressess.dto';
import { UpdateAdressessDto } from './dto/update-adressess.dto';

@Controller('adressess')
export class AdressessController {
  constructor(private readonly adressessService: AdressessService) {}

  @Post()
  create(@Body() createAdressessDto: CreateAdressessDto) {
    return this.adressessService.create(createAdressessDto);
  }

  @Get()
  findAll() {
    return this.adressessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdressessDto: UpdateAdressessDto) {
    return this.adressessService.update(+id, updateAdressessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressessService.remove(+id);
  }
}
