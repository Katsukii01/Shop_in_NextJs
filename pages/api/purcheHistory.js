import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity: Number,
}, { timestamps: true });

const History = mongoose.model('historia', historySchema);

const savePurchaseHistory = async (userId, productId, quantity) => {
  try {
    const historyRecord = new History({
      userId,
      productId,
      quantity,
    });

    await historyRecord.save();

    console.log('Purchase history saved successfully');
  } catch (error) {
    console.error('Error saving purchase history:', error);
  }
};

export default savePurchaseHistory;
