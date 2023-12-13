import type { Handler } from '@netlify/functions';
import { getIdFromPath, getCorsHeaders } from '../../utils';
import { getProductById, getProducts } from './products.service';

export const handler: Handler = async (event) => {
  const instance = event?.queryStringParameters?.instance;
  const productId = getIdFromPath(event.path, 'products');
  try {
    const results = productId
      ? await getProductById(productId, instance)
      : await getProducts(instance);

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
