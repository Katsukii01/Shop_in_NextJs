import mongoose from 'mongoose';

const MONGODB_URI = 'urLinkToDatabase';

let cachedConnection = null;

const connectDB = async () => {
  try {
    if (cachedConnection) {
      return cachedConnection;
    }

    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedConnection = connection;

    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Error connecting to MongoDB');
  }
};

const disconnectDB = async () => {
  try {
    if (cachedConnection) {
      await cachedConnection.disconnect();
      cachedConnection = null;
      console.log('Disconnected from MongoDB');
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

export { connectDB, disconnectDB };
