import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PersonsModule } from './persons/persons.module';
import { PaymentsModule } from './payments/payments.module';
import { PurchasesModule } from './purchases/purchases.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InstancesModule } from './instances/instances.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://streckapp:${process.env.DATABASE_PASSWORD}@streckapp.hluxz.mongodb.net/streckapp?retryWrites=true&w=majority`,
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    PersonsModule,
    PaymentsModule,
    PurchasesModule,
    InstancesModule,
    ProductCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
