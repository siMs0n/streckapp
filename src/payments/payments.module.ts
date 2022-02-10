import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    PersonsModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
