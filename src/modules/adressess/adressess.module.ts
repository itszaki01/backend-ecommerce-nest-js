import { Module } from '@nestjs/common';
import { AdressessService } from './adressess.service';
import { AdressessController } from './adressess.controller';

@Module({
  controllers: [AdressessController],
  providers: [AdressessService],
})
export class AdressessModule {}
