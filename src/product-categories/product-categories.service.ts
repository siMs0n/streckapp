import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import {
  ProductCategory,
  ProductCategoryDocument,
} from './schemas/product-category.schema';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const createdProduct = new this.productCategoryModel(
      createProductCategoryDto,
    );
    return createdProduct.save();
  }

  async findAll(instance?: string): Promise<ProductCategory[]> {
    return this.productCategoryModel
      .find(instance ? { instance } : undefined)
      .exec();
  }

  async findOne(id: string) {
    try {
      return await this.productCategoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product category.');
    }
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    try {
      const result = await this.productCategoryModel
        .updateOne({ _id: id }, updateProductCategoryDto)
        .exec();
      if (result.modifiedCount === 0) {
        throw new NotFoundException(
          'Could not find product category to update.',
        );
      }
      return await this.productCategoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product category to update.');
    }
  }

  async remove(id: string) {
    const result = await this.productCategoryModel
      .deleteOne({ _id: id })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product category.');
    }
    return 'Product category was deleted';
  }

  async removeAllWithInstance(id: string) {
    await this.productCategoryModel.deleteMany({ instance: id }).exec();
  }
}
