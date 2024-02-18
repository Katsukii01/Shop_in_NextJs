//paage.js
import ProductItem from '@/components/ProductItem'
import { data } from '../../pages/api/data'

export default async function Home() {
  delete require.cache[require.resolve('../../pages/api/data')];
  const { data } = await import('../../pages/api/data');
  const { products, pageProps } = data
  console.log("fetched data");
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
} 
