import mongoose from 'mongoose';

let PurchaseHistory;

if (mongoose.models.PurchaseHistory) {
  PurchaseHistory = mongoose.models.PurchaseHistory;
} else {
  const purchaseHistorySchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    productId:  {
      type: String,
      required: true,
    },
    quantity:  {
      type: Number,
      required: true,
    },
  }, { timestamps: true, collection: 'historia' });

  PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);
}

export default PurchaseHistory;
