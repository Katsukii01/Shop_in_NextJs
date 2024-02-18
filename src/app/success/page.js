'use client'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  SignedIn,
  useAuth, 
} from "@clerk/nextjs";

const updateProductCountInStock = async (productId, countInStock) => {
  try {
    const response = await fetch('/api/updateProductCountInStock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: productId, countInStock: countInStock }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error updating product countInStock:', error);
  }
};

const savePurchaseHistory = async (userId, productId, quantity) => {
  try {
    const response = await fetch('/api/savePurchaseHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error saving purchase history:', error);
  }
};


const Home = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { isLoaded, userId } = useAuth();

  const fetchData = async () => {
    console.log(userId);
  };

  useEffect(() => {
    const processCartItems = async () => {
      if (!isLoaded) {
        // Authentication state is not loaded yet
        return;
      }

      // Clear stock
      console.log("clear stock");
      fetchData();

      cartItems.forEach((item) => {
        if(userId!=null){
          savePurchaseHistory(userId, item.id, item.qty);
          console.log(userId, item.id, item.qty);
          updateProductCountInStock(item.id, item.countInStock - item.qty);
        }
      });
    };
    processCartItems();

  }, [cartItems, dispatch, isLoaded, userId]);
  
  return (
    <head>
    <meta http-equiv="refresh" content="1;url=/successC" />
    </head>
  );

};


export default Home;