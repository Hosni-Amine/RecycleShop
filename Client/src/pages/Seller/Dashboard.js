import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../index';
import { AppContext } from '../../index';
import { getOrders } from '../../axiosAPI/Orders.js';
import './dashboard.css'
import { Link } from 'react-router-dom';

export default function Dashboard(){ 

    const [ordersData, setOrdersData] = useState([]);
    const {currentUser,setcurrentUser} = useContext(UserContext);
    const { productList } = useContext(AppContext);

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const ordersData = await getOrders(currentUser); 
            setOrdersData(ordersData.data.orders); 
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
        fetchOrders();
      }, [currentUser]);


return(
        
    <div >
      <div className="container">
            <div className="row justify-content-center align-items-center " style={{ margin: '0px -3px 17px -3px', borderRadius: '10px' }}>
            <div className="col-12 d-flex justify-content-center" >   
                
                <div className="card1" style={{margin:"27px 0px"}}>
                <span>Dashboard</span>
                </div>
                </div>        
            </div>        
            <div className="row justify-content-center align-items-center " style={{ margin: '0px -3px 17px -3px', borderRadius: '10px' ,backgroundColor:"#284c64" }}>
            <div className="col-12 d-flex " >   
            <aside class="profile-card" style={{margin:'25px'}}>
            
            <header>

            <h2 style={{color:'white'}}>
            Welcome back {currentUser.name} {currentUser.lastname}
            </h2>

            <h3 style={{color:'white'}}>
                {currentUser.email}
            </h3>
            <h3 style={{color:'white'}}>
                +{currentUser.phone}
            </h3>

            </header>
            </aside>
        </div>
            </div>
            <div className="container-fluid">
        <div className="row" style={{ margin: '0px -27px 17px -27px'}}>

        <div className="parent-container col-md-12 col-xl-4 col-lg-4 col-sm-12 mb-4">
          <div className="card h-100">
            <div className="content text-center">
              <img src={`http://127.0.0.1:8000/pin.png`} className="img-fluid" alt="Manage Products" style={{ height: 90 }} />
              <div className="title">Update profile</div>
            </div>
            <Link to='/updateProfile'>
            <button type="button" to='/updateProfile'>
              Update profile
            </button>
          </Link>
          </div>
        </div>

        <div className="parent-container col-md-12 col-xl-4 col-lg-4 col-sm-12 mb-4">
          <div className="card h-100">
            <div className="content text-center">
              <img src={`http://127.0.0.1:8000/check-out.png`} className="img-fluid" alt="View Orders" style={{ height: 90 }} />
              <div className="title">Manage Orders</div>
              <h4 style={{ color: "green" }}>
                {ordersData.length > 0 ? `You have ${ordersData.length} orders` : 'No order available'}
                    </h4>
                </div>
                {ordersData.length > 0 && (
            <Link to='/Seller/orders'>
            <button type="button" to='/Seller/orders'>
              Manage orders
            </button>
          </Link>
                )}      
          </div>
        </div>

        <div className="parent-container col-md-12 col-xl-4 col-lg-4 col-sm-12 mb-4">
          <div className="card h-100">
            <div className="content text-center">
              <img src={`http://127.0.0.1:8000/package.png`} className="img-fluid" alt="Update Profile" style={{ height:70 }} />
              <div className="title">Manage products</div>
              <h4 style={{ color: "green" }}>
              {productList.length > 0 ? `You have added ${productList.length}` : 'You have no saved product'}
                </h4>
                </div>
                {productList.length > 0 && (
            <Link to='/Seller/products'>
            <button type="button" to='/Seller/products'>
              manage products
            </button>
          </Link>
            )}
          </div>
        </div>

      </div>
    </div>
      </div>
    </div>
)
}