import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

const clientPromise = mongoClient.connect();

export default async () => {
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
      statusCode: 200,
      body: error.toString(),
    };
  }
};
