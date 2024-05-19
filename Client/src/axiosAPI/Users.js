import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api';

export const login = async (credentials) => {
  try {
    console.log(credentials)
    const response = await axios.post(`${BASE_URL}/login`,credentials);
    return response;
  } catch (error) { 
    console.error("Error:", error);
    return error;
  }
};

export const signup = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post(`${BASE_URL}/register`, userData);
    const res = response.response.data;
    return res;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (userData) => {
  try {
    console.log(userData)
    const response = await axios.post(`${BASE_URL}/updateuser`,userData);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
  // For fetching a single user by ID
export const getUserById = async (accessToken,userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/` + userId, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log("User : ", data);
      return data;
    } else {
      const errorData = await response.text();
      console.log(" Error: ", errorData);
      throw new Error(errorData);
    }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

/*

export const updateUser = async (userId, updatedUser) => {
    try {
      const response = await axios.patch(`${BASE_URL}${users_ENDPOINT}/${userId}`, updatedUser);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error updating User:', error);
      throw error;
    }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}${users_ENDPOINT}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting User:', error);
    throw error;
  }
};
*/