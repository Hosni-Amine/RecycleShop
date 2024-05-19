import React from 'react';
import Navbar from './components/Layout.js';
import Home from './pages/Home.js'
import UsersList from './pages/Admin/UsersList.js'
import ShoppingCart from './pages/ShoppingCart.js'
import Contact from './pages/Contact.js'
import NotFound from './pages/NotFound.js'
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import { createContext, useState , useEffect } from "react";
import { getProductswithlocation,getProducts, addProduct, deleteProduct , updateproductItem } from './axiosAPI/Products.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import UserProfile from './components/userProfile.js';
import UpdateProfile from './components/updateProfile.js';

import OrderList from './pages/Admin/OrderList.js';
import OrderDetails from './pages/Admin/OrderDetails.js';
import ProductList from './pages/Admin/ProductList.js'
import AdminDashboard from './pages/Admin/Dashboard.js'

import OrderListClient from './pages/Client/OrderList.js';
import OrderDetailsClient from './pages/Client/OrderDetails.js';

import SellerDashboard from './pages/Seller/Dashboard.js'
import ProductListSeller from './pages/Seller/ProductList.js'
import OrderListSeller from './pages/Seller/OrderList.js';
import OrderDetailsSeller from './pages/Seller/OrderDetails.js';



const AppContext = createContext();
const UserContext = createContext();

function App() {  
const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cart')) || []);
const [productList, setProductList] = useState([]);
const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem('userCredentials')) || []);

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartList));
}, [cartList]); 

useEffect(() => {
  const fetchData = async () => {
    try {
      const products = await getProductswithlocation(currentUser);        
      setProductList(products);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProductList([]);
    }
  };
  fetchData();
}, []);

useEffect(() => {
  localStorage.setItem('userCredentials', JSON.stringify(currentUser));
  
}, [currentUser]);


const addProductToList = async (newProduct) => {
  try {
    newProduct.append("sellerid", currentUser.id)
    const data = await addProduct(newProduct);
    setProductList([...productList, data.product]);
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

const DeleteProductFromList = async (productId) => {
  try {
    await deleteProduct(productId);
    setProductList(productList.filter(product => product.id !== productId));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
const addProductToCart = async (product) => {
      try {
        const existingProductIndex = cartList.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
          const updatedCart = cartList.map((item, index) => {
            if (index === existingProductIndex) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          setCartList(updatedCart);
          localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        } else {
          const newCartList = [...cartList, { ...product, quantity: 1 }];
          setCartList(newCartList);
          localStorage.setItem('cart', JSON.stringify(newCartList));
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    
  };
const updatecartItem = async (updatedProduct) => {
  try {
    if(updatedProduct.quantity===0)
    {
      const updatedCart = cartList.filter((item) => item.id !== updatedProduct.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartList(updatedCart);
    }
    else {
      const updatedCart = cartList.map((item) =>
      item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartList(updatedCart);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
};
const updateProductItem = async (updatedProduct,id) => {
  try {
    await updateproductItem(updatedProduct,id);
    const productList = await getProducts(currentUser);
    setProductList(productList);
  } catch (error) {
    console.error('Error adding product updating product:', error);
  }
};


return (  
    <AppContext.Provider value={{setCartList,cartList,productList,addProductToCart,updatecartItem,updateProductItem,addProductToList,DeleteProductFromList}}>
      <UserContext.Provider value={{currentUser,setcurrentUser}}>
        <BrowserRouter>
          <Navbar/>
            <Routes>  
              <Route path="/userProfile"element={<UserProfile/>}/>
              <Route path="/updateProfile"element={<UpdateProfile/>}/>
              <Route path="/Auth/Login" element={<Login/>}/>
              <Route path="/Auth/Register" element={<Register/>}/>
              
              <Route path="/orderdetails/:orderId" element={<OrderDetailsClient/>}/>
              <Route path="/Client/orders" element={<OrderListClient/>}/>

              <Route path="/Seller/dashboard" element={<SellerDashboard/>}/>
              <Route path="/Seller/orderDetails/:orderId" element={<OrderDetailsSeller/>}/>
              <Route path="/Seller/products" element={<ProductListSeller/>}/>
              <Route path="/Seller/orders" element={<OrderListSeller/>}/>
              
              <Route path="/Admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="/Admin/products" element={<ProductList/>}/>
              <Route path="Admin/orderDetails/:orderId" element={<OrderDetails/>} />
              <Route path="/Admin/users" element={<UsersList/>}/>
              <Route path="/Admin/orders" element={<OrderList/>}/>
              
              <Route path="/Home" element={<Home/>}/>
              <Route path="/ShoppingCart" element={<ShoppingCart/>}/>
              <Route path="/Contact" element={<Contact/>}/>
              <Route index element={<Home/>}/>
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AppContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  </React.StrictMode>
);

export { AppContext };
export { UserContext };
