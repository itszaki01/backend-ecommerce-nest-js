import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':brandId')
  findOne(@Param('brandId') brandId: string) {
    return this.brandsService.findOne(brandId);
  }

  @Patch(':brandId')
  update(@Param('brandId') brandId: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(brandId, updateBrandDto);
  }

  @Delete(':brandId')
  remove(@Param('brandId') brandId: string) {
    return this.brandsService.remove(brandId);
  }
}
