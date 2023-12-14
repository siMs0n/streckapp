import type { Handler } from '@netlify/functions';
import { getCorsHeaders, parseDto } from '../../utils';
import { ValidationError } from '../../errors';
import { makePurchase } from './purchases.service';
import { CreatePurchaseSchema } from './create-purchase';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: getCorsHeaders(event),
    };
  }
  try {
    const createPurchaseDto = parseDto(event.body, CreatePurchaseSchema);
    const results = await makePurchase(createPurchaseDto);

    return {
      statusCode: 201,
      body: JSON.stringify(results),
      headers: getCorsHeaders(event),
    };
  } catch (error) {
    let statusCode = 500;
    if (error instanceof ValidationError) {
      statusCode = 400;
    }
    return {
      statusCode,
      body: error.toString(),
      headers: getCorsHeaders(event),
    };
  }
};
