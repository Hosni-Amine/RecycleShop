// api.js

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const getProducts = async (user) => {
  
  if(user.userType==="Seller")
  {
    try {
      const response = await axios.get(`${BASE_URL}/productsBySeller/${user.id}`);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }else{
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
};

export const getProductswithlocation = async (user) => {
  if(user && user.userType==="Seller")
    {
      try {
        console.log(user.id)
        const response = await axios.get(`${BASE_URL}/productsBySeller/${user.id}`);
        console.log(response);
        return response.data.product;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }else{
      try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
};

export const addProduct = async (newProduct) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, newProduct);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateproductItem = async (updatedProduct,id) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, updatedProduct);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
};
  

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${productId}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
