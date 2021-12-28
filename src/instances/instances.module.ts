import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstancesController } from './instances.controller';
import { InstancesService } from './instances.service';
import { Instance, InstanceSchema } from './schemas/instance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instance.name, schema: InstanceSchema },
    ]),
  ],
  controllers: [InstancesController],
  providers: [InstancesService],
  exports: [InstancesService],
})
export class InstancesModule {}
