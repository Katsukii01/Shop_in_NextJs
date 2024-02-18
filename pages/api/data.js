//data.js
import fetchData from '../api/db';

const fetchDataAndExport = async () => {
  try {
    const productsData = await fetchData();
    const data = { products: productsData };
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { products: [] }; 
  }
};

export const data = await fetchDataAndExport();