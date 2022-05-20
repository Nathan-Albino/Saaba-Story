import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDb Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export { connectDatabase };
