import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class CheckPasswordIsMatchPipe implements PipeTransform {
  constructor(private readonly usersService:UsersService){}
  async transform(value: any) {
    console.log(value)
    if(value.password != value.passwordConfirm){
        throw new BadRequestException('Passwords must be match')
    }
    return value;
  }
}
