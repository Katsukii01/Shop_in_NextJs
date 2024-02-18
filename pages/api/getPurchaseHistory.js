import { connectDB, disconnectDB } from '../../src/utils/db3';
import PurchaseHistory from '../../models/PurchaseHistory';
import Product from '../../models/product';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { db } = await connectDB();

      const purchaseHistory = await PurchaseHistory.find().lean();

      const purchaseHistoryWithProducts = await Promise.all(
        purchaseHistory.map(async (record) => {
          const product = await Product.findOne({ id: record.productId }, 'name price').lean();
          return {
            ...record,
            productName: product.name,
            productPrice: product.price,
          };
        })
      );

      await disconnectDB();

      return res.status(200).json(purchaseHistoryWithProducts);
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
