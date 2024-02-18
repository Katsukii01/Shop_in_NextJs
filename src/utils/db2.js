import mongoose from 'mongoose';

const MONGODB_URI = 'urLinkToDatabase';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return { db: connection.connection.db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Error connecting to MongoDB');
  }
};

export default connectDB;
