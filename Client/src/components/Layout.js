import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AppContext } from '../index';
import { UserContext } from '../index';
import { useNavigate  } from 'react-router-dom';
import { getProductswithlocation } from '../axiosAPI/Products.js';
import '../App.css';

export default function Navbar() 
    {  
      const navigate = useNavigate();
      const {currentUser,setcurrentUser} = useContext(UserContext);
      const {setCartList , cartList,setProductList} = useContext(AppContext);


      const logoutUser = async () =>  {
        setCartList([]);
        setcurrentUser([]);
                        
        const fetchData = async () => {
          try {
            const products = await getProductswithlocation(null);        
            setProductList(products);
            console.log(products)
          } catch (error) {
            console.error('Error fetching data:', error);
            setProductList([]);
          }
        };

        fetchData();
        navigate('/Auth/login');
      };
      let productPrice = cartList.reduce((totalQuantity, item) => totalQuantity + item.quantity*item.price, 0);
      productPrice = "$"+productPrice;
    if(currentUser)
      {
        return (
              <nav className="navbar navbar-expand-lg navbar-light " style={{marginBottom:25, backgroundColor:'#4453a6'}}>
                  <div className="container-fluid">
                    <Link to="/Home" className="navbar-brand" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}}>Recycle Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                      <span style={{maxWidth:150}} className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ bsScrollHeight: 100 }}>
                        <li className="nav-item">
                          <Link to="/Home" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}} className="nav-link active " aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/About" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}} className="nav-link active" aria-current="page">About</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/Contact" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}} className="nav-link active " aria-current="page">Contact</Link>
                        </li>
                      </ul>
                      {currentUser.email && (
                        <>
                          {currentUser.userType === "Seller" && (
                            <ul className="navbar-nav ms-auto " style={{marginRight:65}}>
                              <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/#" role="button" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}}
                                data-bs-toggle="dropdown" aria-expanded="false">
                                  {currentUser.name} {currentUser.lastname} (Seller)
                                </Link>
                                <ul className="dropdown-menu">
                                  <li><Link className="dropdown-item" to="/Seller/dashboard">Dashboard</Link></li>
                                  <li><Link className="dropdown-item" to="/Seller/products">Products</Link></li>
                                  <li><Link className="dropdown-item" to="/Seller/orders">Orders</Link></li>
                                  <li><hr className="dropdown-divider" /></li>
                                  <li><Link className="dropdown-item" to='/userProfile'>Profile</Link></li>
                                  <li><Link className="dropdown-item" to='/Home' onClick={logoutUser}>Logout</Link></li>
                                </ul>
                              </li>
                            </ul>
                          )}
                          {currentUser.userType === "Admin" && (
                            <ul className="navbar-nav ms-auto " style={{marginRight:65}}>
                              <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/#" role="button" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}}
                                data-bs-toggle="dropdown" aria-expanded="false">
                                  {currentUser.name} {currentUser.lastname} (Admin)
                                </Link>
                                <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/Admin/dashboard">Dashboard</Link></li>
                                  <li><Link className="dropdown-item" to="/Admin/products">Products</Link></li>
                                  <li><Link className="dropdown-item" to="/Admin/orders">Orders</Link></li>
                                  <li><Link className="dropdown-item" to="/Admin/users">Users</Link></li>
                                  <li><hr className="dropdown-divider" /></li>
                                  <li><Link className="dropdown-item" to='/userProfile'>Profile</Link></li>
                                  <li><Link className="dropdown-item" to='/Home' onClick={logoutUser}>Logout</Link></li>
                                </ul>
                              </li>
                            </ul>
                          )}

                          {currentUser.userType === "Client" && (
                            <ul className="navbar-nav ms-auto " style={{marginRight:65}}>
                              <li className="nav-item dropdown" style={{marginTop:5}}>
                                <Link className="nav-link dropdown-toggle" to="/#" role="button"  style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}}
                                data-bs-toggle="dropdown" aria-expanded="false">
                                  {currentUser.name} { currentUser.lastname}
                                </Link>
                                <ul className="dropdown-menu"  style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}}>
                                  <li><Link className="dropdown-item" to="/Client/orders">Orders</Link></li>                                  
                                  <li><hr className="dropdown-divider" /></li>
                                  <li><Link className="dropdown-item" to='/userProfile'>Profile</Link></li>
                                  <li><Link className="dropdown-item" onClick={logoutUser}>Logout</Link></li>
                                </ul>
                              </li>
                              <li className="nav-item">
                                <Link to="/ShoppingCart" className="nav-link " type="button">
                                        <div className="button">
                                          <span className="cart-count">{productPrice}</span>
                                            <div className="button-wrapper">
                                              <div className="text" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}} >Cart</div>
                                                <span className="icon">
                                                  <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                                  </svg>
                                                </span>
                                              </div>
                                            </div>
                                </Link>
                              </li>
                                          
                            </ul>
                          )}
                        </>
                      )}
                      {!currentUser.email && (
                        <ul className="navbar-nav ms-auto " style={{marginRight:65}}>
                          <li className="nav-item">
                            <Link to="/Auth/Login" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}} className="nav-link active" aria-current="page">Login</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/Auth/Register" style={{fontFamily:'Fira Mono', fontFamily:'monospace',color:'white'}} className="nav-link active" aria-current="page">Register</Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </nav>
      );
     }
    }
