'use client'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/redux/slices/cartSlice'
import { useEffect } from 'react';


const Home = () => {
 
  console.log("clear cart");
  const dispatch = useDispatch();
  dispatch(clearCart());

  
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <h1>Payment ended with success</h1>
    </div>
  );
};

export default Home;
