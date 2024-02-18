'use client'

import { useEffect, useState } from 'react';
import {
  SignedIn,
  useAuth, 
} from "@clerk/nextjs";

const Home = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const { isLoaded, userId} = useAuth();

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await fetch('/api/getPurchaseHistory');
        const data = await response.json();

        if (response.ok) {
          setPurchaseHistory(data);
        } else {
          console.error('Error fetching purchase history:', data.error);
        }
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  return (
  <SignedIn>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <h1>Purchase History :</h1>
      
      <ul>
 
        {purchaseHistory.map((record) => (
          <div>
          {isLoaded && userId === record.userId && ( 
          <li key={record._id}> 
            <p>Product Name: {record.productName}</p>
            <p>Product Price: {record.productPrice}</p>
            <p>Quantity: {record.quantity}</p>
            <br/>
            <hr/>
          
          </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  </SignedIn>
  );
};

export default Home;
