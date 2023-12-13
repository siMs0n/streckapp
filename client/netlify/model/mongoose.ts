import {
  IInstance,
  instanceModelName,
  instanceSchema,
  productCategoryModelName,
  productCategorySchema,
  productModelName,
  productSchema,
} from './models';

import mongoose from 'mongoose';

let conn = null;

export const connect = async function () {
  if (conn === null) {
    conn = mongoose
      .connect(process.env.MONGOOSE_URI as string, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose);

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;
    conn.model(instanceModelName, instanceSchema);
    conn.model(productCategoryModelName, productCategorySchema);
    conn.model(productModelName, productSchema);
  }

  return conn;
};
