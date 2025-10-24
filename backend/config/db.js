import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGO_DB_NAME || 'ideachain'
  });
};

export default connectDB;
