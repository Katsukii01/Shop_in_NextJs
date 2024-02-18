//page.js
import React from 'react';
import ProductEdit from '../../components/ProductEdit'
import { data } from '../../../pages/api/data'
import ProductForm from './ClientForm'


export default async function Home() {
  delete require.cache[require.resolve('../../../pages/api/data')];
  const { data } = await import('../../../pages/api/data');
  const { products } = data;
  //console.log("produkty: ",products);
  const handleProductAdded = (newProduct) => {
    console.log('Product added in Home:', newProduct);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <div className="border-2 border-sky-500 rounded">

        <ProductForm />
      </div>
     {products.map((product) => (
        <ProductEdit key={product.id} product={product} />
      ))}
    </div>
  );
 
}