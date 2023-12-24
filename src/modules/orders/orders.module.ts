import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserOrder, UserOrderSchema } from './schema/order.schema';
import { CartsModule } from '../carts/carts.module';

@Module({
  imports:[CartsModule,MongooseModule.forFeature([{name:UserOrder.name,schema:UserOrderSchema}])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
