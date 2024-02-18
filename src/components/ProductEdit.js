'use client'
import React, { useState, useRef, useEffect } from 'react';
import {
  SignedIn,
  useAuth, 
} from "@clerk/nextjs";

const ProductForm = ({ product }) => {
  const fileInputRef = useRef(null);

  const [apiUsed, setApiUsed] = useState(false);
  const { isLoaded, userId} = useAuth();
  const [newProduct, setNewProduct] = useState({
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    rating: product.rating,
    numReviews: product.numReviews,
    size: product.size,
    description: product.description,
  });

  const [imagePreview, setImagePreview] = useState(product.image);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      const fileNameWithPrefix = `/images/${file.name}`;

      setNewProduct((prevProduct) => ({
        ...prevProduct,
        image: fileNameWithPrefix,
        [name]: fileNameWithPrefix,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (newProduct.image !== product.image) {
        const deleteOldFileResponse = await fetch('/api/deleteFile', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: product.image }),
        });

        if (deleteOldFileResponse.ok) {
          const deleteOldFileData = await deleteOldFileResponse.json();
          console.log('Stary plik usunięty pomyślnie:', deleteOldFileData);
        } else {
          console.error('Błąd usuwania starego pliku:', deleteOldFileResponse.statusText);
        }

        const formData = new FormData();
        formData.append('image', fileInputRef.current.files[0]);

        const addNewFileResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (addNewFileResponse.ok) {
          const addNewFileData = await addNewFileResponse.json();
          console.log('Nowy plik dodany pomyślnie:', addNewFileData);

          setNewProduct((prevProduct) => ({
            ...prevProduct,
            image: addNewFileData.filePath,
          }));
        } else {
          console.error('Błąd dodawania nowego pliku:', addNewFileResponse.statusText);
        }
      }

      const updateProductResponse = await fetch('/api/updateProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (updateProductResponse.ok) {
        const updateProductData = await updateProductResponse.json();
        console.log('Produkt zaktualizowany pomyślnie:', updateProductData);

        setApiUsed(true);

        fileInputRef.current.value = null;
      } else {
        console.error('Błąd aktualizacji produktu:', updateProductResponse.statusText);
      }
    } catch (error) {
      console.error('Błąd:', error.message);
    }
  };

  useEffect(() => {
    if (apiUsed) {
      window.location.reload();
    }
  }, [apiUsed]);


  const handleDelete = async () => {
    try {
      const deleteProductResponse = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName: newProduct.name }),
      });

      if (deleteProductResponse.ok) {
        const deleteProductData = await deleteProductResponse.json();

        if (newProduct.image) {
          const deleteFileResponse = await fetch('/api/deleteFile', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: newProduct.image }),
          });

          if (deleteFileResponse.ok) {
            const deleteFileData = await deleteFileResponse.json();
            console.log('Produkt i plik usunięte pomyślnie:', deleteProductData, deleteFileData);
          } else {
            console.error('Błąd usuwania pliku:', deleteFileResponse.statusText);
          }
        } else {
          console.log('Produkt usunięty pomyślnie:', deleteProductData);
        }

        setApiUsed(true);
      } else {
        console.error('Błąd usuwania produktu:', deleteProductResponse.statusText);
      }
    } catch (error) {
      console.error('Błąd:', error.message);
    }
  };
  return (
    <SignedIn>
      {isLoaded && userId === "user_2aUkHaUdWvFd6jN8wqS3VFOQNaI" && (
    <div className="card">
      <form>
      <div>
  
      </div>
        <label>Product {newProduct.id}</label>
        <hr />
        <br></br>
        <label>
          Name:
          <input type="text" value={newProduct.name} onChange={handleInputChange} name="name"></input>
        </label>
        <br></br>
        <label>
          <input type="hidden" value={newProduct.image} />
        </label>
        <br></br>
        <input type="file" name="image" onChange={handleInputChange} ref={fileInputRef} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product Image"
            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
          />
        )}
        <label>
          Price$:
          <input type="text" value={newProduct.price} onChange={handleInputChange} name="price" />
        </label>
        <br></br>
        <label>
          countInStock:
          <input type="text" value={newProduct.countInStock} onChange={handleInputChange} name="countInStock" />
        </label>
        <br></br>
        <label>
          Rating:
          <input type="text" value={newProduct.rating} onChange={handleInputChange} name="rating" />
        </label>
        <br></br>
        <label>
          Number of reviews:
          <input type="text" value={newProduct.numReviews} onChange={handleInputChange} name="numReviews" />
        </label>
        <br></br>
        <label>
          Size in cm:
          <input type="text" value={newProduct.size} onChange={handleInputChange} name="size" />
        </label>
        <br></br>
        <label>
          Description:
          <input type="textarea" value={newProduct.description} onChange={handleInputChange} name="description" />
        </label>
        <br></br>

        <button className="border-2 border-sky-500 rounded" type="button" onClick={handleSave}>
          Zapisz
        </button>
        <button className="border-2 border-sky-500 rounded" type="button" onClick={handleDelete}>
          Usuń
        </button>
      </form>
    </div>
      )}
    </SignedIn>
  );
};
export default ProductForm;
