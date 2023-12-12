import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(instance?: string): Promise<Product[]> {
    return this.productModel
      .find(instance ? { instance } : undefined)
      .populate('category')
      .exec();
  }

  async findOne(id: string) {
    try {
      return await this.productModel.findById(id).populate('category').exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productModel
        .updateOne({ _id: id }, updateProductDto)
        .exec();
      if (result.modifiedCount === 0) {
        throw new NotFoundException('Could not find product to update.');
      }
      return await this.productModel.findById(id).populate('category').exec();
    } catch (error) {
      throw new NotFoundException('Could not find product to update.');
    }
  }

  async remove(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product.');
    }
    return 'Product was deleted';
  }

  async removeAllWithInstance(id: string) {
    await this.productModel.deleteMany({ instance: id }).exec();
  }
}
