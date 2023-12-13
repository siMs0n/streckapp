import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

const clientPromise = mongoClient.connect();

export default async () => {
  try {
    const database = (await clientPromise).db('streckapp');
    const products = database.collection('products');

    const results = await products.find({}).toArray();

    return Response.json(results);
  } catch (error) {
    return new Response(error.toString(), { status: 500 });
  }
};
