import type { Handler } from '@netlify/functions';
import { getCorsHeaders } from '../../utils';
import { ValidationError } from '../../errors';
import { makePayment } from './payments.service';
import { parseCreatePaymentDto } from './create-payment.dto';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: getCorsHeaders(event),
    };
  }
  try {
    const createPaymentDto = parseCreatePaymentDto(event.body);
    const results = await makePayment(createPaymentDto);

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
