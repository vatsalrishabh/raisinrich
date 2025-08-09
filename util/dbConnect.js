import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// For development, if MongoDB is not available, we'll use a mock connection
if (!MONGODB_URI) {
  console.warn("⚠️  MONGODB_URI not found. Using mock database for development.");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If no MongoDB URI is provided, return a mock connection
  if (!MONGODB_URI) {
    console.log("🔧 Using mock database connection for development");
    return { connection: { name: "mock-database" } };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
         console.log("✅ Connected to MongoDB database:", mongoose.connection.name);
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        console.log("🔧 Using mock database connection for development");
        return { connection: { name: "mock-database" } };
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
