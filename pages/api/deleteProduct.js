import connectDB from '../../src/utils/db';
import Product from '../../models/product';

const deleteProductFromDB = async (productName) => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const deletedProduct = await Product.findOneAndDelete({ name: productName });

    if (!deletedProduct) {
      console.error('Product not found');
      throw new Error('Product not found');
    }

    console.log('Product deleted successfully:', deletedProduct);
    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product from MongoDB:', error);
    throw new Error('Error deleting product from MongoDB');
  }
};

export default deleteProductFromDB;