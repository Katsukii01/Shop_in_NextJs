
import mongoose from 'mongoose';

const MONGODB_URI = 'urLinkToDatabase';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;