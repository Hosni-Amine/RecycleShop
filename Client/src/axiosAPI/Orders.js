// api.js

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const getOrders = async (currentuser) => {
  if(currentuser.userType==="Seller"){try {
    const response = await axios.get(`${BASE_URL}/ordersBySeller/${currentuser.id}`);
    console.log(response.data)
    return response;
   }catch (error) {
    if (error.response && error.response.status === 404) {
      window.alert(error.response.data.message);
      throw error;
    } else {
      console.error('Error fetching orders:', error);
      throw error;
    }
   }
 }else if(currentuser.userType==="User"){try {
   const response = await axios.get(`${BASE_URL}/ordersByClient/${currentuser.id}`);
   console.log(response.data)
    return response;
  }catch (error) {
  console.error('Error fetching orders:', error);
  throw error;
  }
 }else{
  try {
    const response = await axios.get(`${BASE_URL}/getAllorders`);
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
 }
};

export const getOrderByUserId = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/orderbyuser/`+userId);
        return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  export const approveOrder = async (userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/approveOrder/`+userId);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  export const getOrder = async (orderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/getOrderById/`+orderId);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };
  export const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/orders/`+orderId);
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

  export const addOrders = async (newOrders) => {
    try {
      const responses = []; // Array to store responses
      for (const item of newOrders.products) {
        const order = {
          productid: item.id, 
          quantity: item.quantity, 
          price: item.price * item.quantity, 
          buyerid: newOrders.buyerid
        };  
        const response = await addOrder(order);
        responses.push(response);
      }
      return responses; 
    } catch (error) {
      console.error('Error adding orders:', error);
      throw error;
    }
  };
  
  export const addOrder = async (newOrder) => {
    try {
      console.log('Adding order:', newOrder);
      const response = await axios.post(`${BASE_URL}/orders`, newOrder);
      console.log('Order added successfully:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

