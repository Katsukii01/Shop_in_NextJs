'use client'
import React, { useState, useEffect } from 'react';
import {
  SignedIn,
  useAuth, 
} from "@clerk/nextjs";

const ProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    image: '',
    price: '',
    countInStock: '',
    rating: '',
    numReviews: '',
    size: '',
    description: '',
  });
  const { isLoaded, userId} = useAuth();
  const [apiUsed, setApiUsed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const fileNameWithPrefix = `/images/${file.name}`;
      setNewProduct({ ...newProduct, [name]: fileNameWithPrefix, image: fileNameWithPrefix });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  useEffect(() => {
    if (apiUsed) {
      window.location.reload();
    }
  }, [apiUsed]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newProduct }),
      });

      if (response.ok) {
        const data = await response.json();

        const formData = new FormData();
        formData.append('image', e.target.image.files[0]);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          console.log('Produkt dodany pomyślnie:', data);

          setNewProduct({
            id: '',
            name: '',
            image: '',
            price: '',
            countInStock: '',
            rating: '',
            numReviews: '',
            size: '',
            description: '',
          });

          setApiUsed(true);
        } else {
          console.error('Błąd podczas przesyłania pliku:', uploadResponse.statusText);
        }
      } else {
        console.error('Błąd dodawania produktu:', response.statusText);
      }
    } catch (error) {
      console.error('Błąd:', error.message);
    }
  };

  return(
    <SignedIn>
    {isLoaded && userId === "user_2aUkHaUdWvFd6jN8wqS3VFOQNaI" && (
    <form onSubmit={handleSubmit}>
      <label>New Product</label>
      <hr />
      <br></br>
      <label>
        ID:
        <input type="text" name="id" onChange={handleInputChange} value={newProduct.id}></input>
      </label>
      <br></br>
      <label>
        Name:
        <input type="text" name="name" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <label>
        Image:
        <input type="file" name="image" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <label>
        Price$:
        <input type="text" name="price" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <label>
        countInStock:
        <input type="text" name="countInStock" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <label>
        Rating:
        <input type="text" name="rating" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <label>
        Number of reviews:
        <input type="text" name="numReviews" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <label>
        Size in cm:
        <input type="text" name="size" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <label>
        Description:
        <input type="textarea" name="description" onChange={handleInputChange}></input>
      </label>
      <br></br>
      <button className="border-2 border-sky-500 rounded" type="submit">
        Dodaj
      </button>
    </form>
        )}
    </SignedIn>
  );
};

export default ProductForm;
