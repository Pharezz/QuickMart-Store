// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("MONGODB_URI in build:", MONGODB_URI ? "✅ defined" : "❌ missing");

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env.local");

let cached = global.__mongoose;
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName:
          new URL(MONGODB_URI).pathname.replace(/^\//, "") ||
          "next-simple-store",
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
