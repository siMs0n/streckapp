import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CreateMultiPurchaseDto } from './dto/create-multi-purchase.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('Purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/multi')
  createMany(@Body() createMultiPurchaseDto: CreateMultiPurchaseDto) {
    return this.purchasesService.createMany(createMultiPurchaseDto);
  }

  @Get()
  findAll(
    @Query('instance') instance: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.purchasesService.findAll(instance, limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(id);
  }
}
