import { connect } from '../../model/mongoose';
import mongoose from 'mongoose';
import { productCategoryModelName } from './product-category.model';
import { NotFoundError } from '../../errors';

export const getProductCategorys = async (instance?: string) => {
  await connect();

  const ProductCategory = mongoose.model(productCategoryModelName);
  const results = await ProductCategory.find(
    instance ? { instance } : {},
  ).exec();
  return results;
};

export const getProductCategoryById = async (id: string, instance?: string) => {
  await connect();

  try {
    const ProductCategory = mongoose.model(productCategoryModelName);
    const results = await ProductCategory.findOne(
      instance
        ? { instance, _id: id }
        : { _id: new mongoose.Types.ObjectId(id) },
    )
      .orFail()
      .exec();
    return results;
  } catch (error) {
    throw new NotFoundError('Could not find product category.');
  }
};
