import addProductToDB from './productAddService'
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const newProductData = req.body;
        const savedProduct = await addProductToDB(newProductData);
        res.status(200).json({ success: true, data: savedProduct });
      } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, error: 'Error adding product to MongoDB' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }