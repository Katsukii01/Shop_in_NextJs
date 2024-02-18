import deleteProductFromDB from '../api/deleteProduct';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const productName = req.body.productName; 
      const deletedProduct = await deleteProductFromDB(productName);
      res.status(200).json({ success: true, data: deletedProduct });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ success: false, error: 'Error deleting product from MongoDB' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
