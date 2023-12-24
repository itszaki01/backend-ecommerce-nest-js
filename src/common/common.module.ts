import { Global, Module } from '@nestjs/common';
import { SubCategoriesModule } from 'src/modules/sub-categories/sub-categories.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { TokenService } from './services/token.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
    imports:[SubCategoriesModule,CategoriesModule,ConfigModule],
    providers: [TokenService],
    exports:[TokenService]
})
export class CommonModule {}
