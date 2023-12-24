import { Module } from '@nestjs/common';
import { UsersWishListController } from './users-wish-list.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports:[ProductsModule],
  controllers: [UsersWishListController],
})
export class UsersWishListModule {}
