const URI = process.env.MONGO_URI;

import mongoose from "mongoose";
import log from "../Utils/Logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    log.info(`Mongoose Connected: ${conn.connection.host}`.yellow.bold);
  } catch (err) {
    log.info(`Error while connecting to database: ${err.message}`.red.bold);
  }
};

export { connectDB };
