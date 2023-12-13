const mongoose = require('mongoose');

let conn = null;

export const connect = async function () {
  if (conn === null) {
    conn = mongoose.createConnection(process.env.MONGOOSE_URI as string, {
      serverSelectionTimeoutMS: 5000,
    });

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn.asPromise();
  }

  return conn;
};
