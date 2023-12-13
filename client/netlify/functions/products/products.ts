import { connect } from '../../model/mongoose';
import type { Handler, HandlerEvent } from '@netlify/functions';
import { productModelName } from '../../model/models';
import mongoose from 'mongoose';

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

const getProducts = async (instance?: string) => {
  await connect();

  const Product = mongoose.model(productModelName);
  const results = await Product.find(instance ? { instance } : {})
    .populate('category')
    .exec();
  return results;
};

const getProductById = async (id: string, instance?: string) => {
  await connect();

  const Product = mongoose.model(productModelName);
  const results = await Product.findOne(
    instance ? { instance, _id: id } : { _id: new mongoose.Types.ObjectId(id) },
  )
    .populate('category')
    .exec();
  return results;
};

const getIdFromPath = (path: string, resource: string): string | undefined => {
  const parts = path.split(`${resource}/`);
  if (parts.length === 2 && parts[1] !== '') return parts[1];
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
