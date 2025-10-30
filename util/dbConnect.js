import mongoose from "mongoose";

// Use local MongoDB for development if Atlas connection fails
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/raisinrich";

// Don't throw error if MONGODB_URI is not defined, use local fallback instead
if (!MONGODB_URI) {
  console.warn("MONGODB_URI not defined, using local MongoDB fallback");
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
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      })
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB database:", mongoose.connection.name);
        return mongoose;
      })
      .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        // Try connecting to local MongoDB if remote connection fails
        if (MONGODB_URI !== "mongodb://localhost:27017/raisinrich") {
          console.log("Attempting to connect to local MongoDB...");
          return mongoose.connect("mongodb://localhost:27017/raisinrich", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        }
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
