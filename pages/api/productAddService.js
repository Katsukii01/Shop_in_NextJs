import connectDB from '../../src/utils/db';
import Product from '../../models/product';
const addProductToDB = async (productData) => {
    try {
      await connectDB();
      console.log('Connected to MongoDB');
  
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
  
      console.log('Product added successfully:', savedProduct);
      return savedProduct;
    } catch (error) {
      console.error('Error adding product to MongoDB:', error);
      throw new Error('Error adding product to MongoDB');
    }
  };
  
  export default addProductToDB;