import { MongoClient } from 'mongodb';
import type { Handler, HandlerEvent } from '@netlify/functions';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

const clientPromise = mongoClient.connect();

export const handler: Handler = async (event) => {
  try {
    const database = (await clientPromise).db('streckapp');
    const productCategories = database.collection('productcategories');

    const results = await productCategories.find({}).toArray();

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
