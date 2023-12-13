import { MongoClient } from 'mongodb';
import type { Handler } from '@netlify/functions';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

const clientPromise = mongoClient.connect();

export const handler: Handler = async () => {
  try {
    const database = (await clientPromise).db('streckapp');
    const products = database.collection('products');

    const results = await products.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
