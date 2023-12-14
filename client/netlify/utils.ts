import { HandlerEvent } from '@netlify/functions';
import { ZodSchema } from 'zod';
import { ValidationError } from './errors';

export const getIdFromPath = (
  path: string,
  resource: string,
): string | undefined => {
  const parts = path.split(`${resource}/`);
  if (parts.length === 2 && parts[1] !== '') return parts[1];
};

export const getCorsHeaders = (event: HandlerEvent) => {
  const origin = (event?.headers?.Origin || event?.headers?.origin) ?? '';
  const allowedOrigins = [
    'https://strecklista.netlify.app',
    'http://localhost:3000',
  ];
  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
};

export const parseDto = (input: string | null, schema: ZodSchema) => {
  if (input === null) {
    throw new ValidationError('Nothing was posted');
  }

  const result = schema.safeParse(JSON.parse(input));

  if (result.success === false) throw new ValidationError(result.error.message);

  return result.data;
};
