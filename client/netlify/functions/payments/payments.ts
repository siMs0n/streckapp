import type { Handler } from '@netlify/functions';
import { getCorsHeaders, parseDto } from '../../utils';
import { ValidationError } from '../../errors';
import { makePayment } from './payments.service';
import { CreatePaymentSchema } from './create-payment.dto';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: getCorsHeaders(event),
    };
  }
  try {
    const createPaymentDto = parseDto(event.body, CreatePaymentSchema);
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
