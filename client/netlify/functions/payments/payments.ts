import type { Handler } from '@netlify/functions';
import { getCorsHeaders } from '../../utils';
import { makePayment } from './payments.service';
import { CreatePaymentSchema } from './create-payment.dto';
import { ZodError } from 'zod';

export const handler: Handler = async (event) => {
  try {
    const createPaymentDto = CreatePaymentSchema.parse(event.body);
    const results = await makePayment(createPaymentDto);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: getCorsHeaders(event),
    };
  } catch (error) {
    let statusCode = 500;
    let body = error.toString();
    if (error instanceof ZodError) {
      statusCode = 400;
      body = error.issues;
    }
    return {
      statusCode: 500,
      body,
      headers: getCorsHeaders(event),
    };
  }
};
