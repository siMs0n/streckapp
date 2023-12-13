import { HandlerEvent } from '@netlify/functions';

export const getIdFromPath = (
  path: string,
  resource: string,
): string | undefined => {
  const parts = path.split(`${resource}/`);
  if (parts.length === 2 && parts[1] !== '') return parts[1];
};

export const getCorsHeaders = (event: HandlerEvent) => {
  const origin = event?.headers?.Origin || event?.headers?.origin;
  const allowedOrigins = [
    'https://strecklista.netlify.app',
    'http://localhost:3000',
  ];
  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin)
      ? origin
      : allowedOrigins[0],
  };
};
