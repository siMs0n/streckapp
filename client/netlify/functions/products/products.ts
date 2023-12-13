import { connect } from '../../model/mongoose';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { productModelName } from '../../model/models';
import mongoose from 'mongoose';

export const handler: Handler = async (event) => {
  const instance = event?.queryStringParameters?.instance;
  console.log(event.path);
  try {
    await connect();

    const Product = mongoose.model(productModelName);
    const results = await Product.find(instance ? { instance } : {})
      .populate('category')
      .exec();

    return {
      statusCode: 200,
      body: JSON.stringify(results),
      headers: getHeaders(event),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
      headers: getHeaders(event),
    };
  }
};

const getHeaders = (event: HandlerEvent) => {
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
