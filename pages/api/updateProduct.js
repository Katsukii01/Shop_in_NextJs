import connectDB from '../../src/utils/db2';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { id, name, image, price, countInStock, rating, numReviews, size, description } = req.body;

  try {

    console.log()
    const { db } = await connectDB();
    const collection = db.collection('products');

    const filter = { id: id };
    const update = {
      $set: {
        name: name,
        image: image,
        price: price,
        countInStock: countInStock,
        rating: rating,
        numReviews: numReviews,
        size: size,
        description: description,
      },
    };

    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount > 0) {
      res.status(200).json({ success: true, message: 'Produkt zaktualizowany pomyślnie' });
    } else {
      res.status(404).json({ success: false, message: 'Nie znaleziono produktu do aktualizacji' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Wewnętrzny błąd serwera' });
  }
}
