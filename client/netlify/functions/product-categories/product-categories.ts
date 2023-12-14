import type { Handler } from '@netlify/functions';
import { getCorsHeaders, getIdFromPath } from '../../utils';
import {
  getProductCategoryById,
  getProductCategorys,
} from './product-categories.service';
import { NotFoundError } from '../../errors';

export const handler: Handler = async (event) => {
  const instance = event?.queryStringParameters?.instance;
  const productCategoryId = getIdFromPath(event.path, 'product-categories');
  try {
    const results = productCategoryId
      ? await getProductCategoryById(productCategoryId, instance)
      : await getProductCategorys(instance);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: getCorsHeaders(event),
    };
  } catch (error) {
    let statusCode = 500;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    }
    return {
      statusCode: 500,
      body: error.toString(),
      headers: getCorsHeaders(event),
    };
  }
};
