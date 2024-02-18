import dbConnect from '../../src/utils/db2';
import PurchaseHistory from '../../models/PurchaseHistory';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { userId, productId, quantity } = req.body;

    try {
      await dbConnect();

      const purchaseHistory = new PurchaseHistory({
        userId,
        productId,
        quantity,
      });

      await purchaseHistory.save();

      console.log('Purchase history saved successfully');

      return res.status(200).json({ message: 'Purchase history saved successfully' });
    } catch (error) {
      console.error('Error saving purchase history:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
