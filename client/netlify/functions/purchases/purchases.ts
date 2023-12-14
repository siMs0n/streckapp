import type { Handler } from '@netlify/functions';
import { getCorsHeaders } from '../../utils';
import { ValidationError } from '../../errors';
import { makePurchase } from './purchases.service';
import { parseCreatePurchaseDto } from './create-purchase';

export const handler: Handler = async (event) => {
  try {
    const createPurchaseDto = parseCreatePurchaseDto(event.body);
    const results = await makePurchase(createPurchaseDto);

    return {
      statusCode: 200,
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
