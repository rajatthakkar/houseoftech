import mongoose from "mongoose";

const MONGOURL = process.env.MONGOURL as string;
console.log("MONGOURL", MONGOURL);
if (!MONGOURL) {
  throw new Error(
    "Please define the MONGOURL environment variable inside .env.local"
  );
}
let cached = (global as any).mongoose || { conn: null, promise: null };
async function createMongooseConection() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGOURL, {
        dbName: "atithi",
      })
      .then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
// Cache the connection globally in dev mode
(global as any).mongoose = cached;
export default createMongooseConection;
