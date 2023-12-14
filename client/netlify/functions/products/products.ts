import type { Handler } from '@netlify/functions';
import { getIdFromPath, getCorsHeaders } from '../../utils';
import { getProductById, getProducts } from './products.service';
import { NotFoundError } from '../../errors';

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
    let statusCode = 500;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    }
    return {
      statusCode,
      body: error.toString(),
      headers: getCorsHeaders(event),
    };
  }
};
