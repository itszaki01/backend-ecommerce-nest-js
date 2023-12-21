import { Module } from '@nestjs/common';
import { UsersModule } from '../modules//users/users.module';
import { SubCategoriesModule } from 'src/modules/sub-categories/sub-categories.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';


@Module({
    imports:[UsersModule,SubCategoriesModule,CategoriesModule]
})
export class CommonModule {}
