import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonsModule } from 'src/persons/persons.module';
import { ProductsModule } from 'src/products/products.module';
import { InstancesController } from './instances.controller';
import { InstancesService } from './instances.service';
import { Instance, InstanceSchema } from './schemas/instance.schema';
import { PurchasesModule } from '../purchases/purchases.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instance.name, schema: InstanceSchema },
    ]),
    PersonsModule,
    ProductsModule,
    PurchasesModule,
    PaymentsModule,
  ],
  controllers: [InstancesController],
  providers: [InstancesService],
  exports: [InstancesService],
})
export class InstancesModule {}
