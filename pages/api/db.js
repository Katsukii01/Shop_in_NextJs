// db.js
import connectDB from '../../src/utils/db2';
import Product from '../../models/product';

const fetchData = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB tu');
    const data = await Product.find({});
    return data.map(product => ({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      rating: product.rating,
      numReviews: product.numReviews,
      size: product.size,
      description: product.description,
    }));
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};
export default fetchData;
