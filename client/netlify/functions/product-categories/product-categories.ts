import type { Handler } from '@netlify/functions';
import { getCorsHeaders, getIdFromPath } from '../../utils';
import {
  getProductCategoryById,
  getProductCategorys,
} from './product-categories.service';

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
    return {
      statusCode: 500,
      body: error.toString(),
      headers: getCorsHeaders(event),
    };
  }
};
