import React, { useState, useEffect } from 'react';
import { getOrder,deleteOrder, approveOrder } from '../../axiosAPI/Orders.js';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [ordersData, setOrdersData] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrder(orderId); 
        setOrdersData(ordersData.order); 
        setOrderStatus(ordersData.order.status);
        console.log(ordersData.order)
        console.log(orderStatus)
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrders(); 
  }, [orderId]);

  let approveButtonMessage = 'Approve order';
  if (orderStatus === 1) {
    approveButtonMessage = 'Unapprove order';
  }

  const deleteThisOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      navigate("/Seller/orders"); // Navigate to the previous page
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const confirmapproveOrder = async (orderId) => {
    try {
      const response = await approveOrder (orderId);
    } catch (error) {
      console.error('Error appoving order:', error);
    }
  };

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      deleteThisOrder(orderId);
    }
  };

  const handleApproveOrder = () => {
    if (window.confirm('Are you sure you want to '+approveButtonMessage+' ?')) {
      confirmapproveOrder(orderId);
    }
  };

  const handleReturn = () => {
    navigate('/Seller/orders')
  };


  return (
    <div className='bg-light'>
              <div className='container py-5'>
                <h2 className="mb-3 text-center">Order details</h2>
                <div className="row g-2 mb-5">
                  <div className="col-12">
                    <div className="rounded border shadow p-3 text-center h-100">
                      <form className="row gx-3 gy-2 align-items-start">
                        <div className="col-12 " style={{textAlign:'left'}}>
                          <label htmlFor="firstname"  style={{marginLeft:8}} className="form-label">Order ID</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ordersData.id ? ordersData.id : 'Loading...'}
                            id="firstname"
                            placeholder="First Name"
                            readOnly
                          />
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="lastname"style={{marginLeft:8}} className="form-label">Buyer name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ordersData.buyer ? ordersData.buyer.name+" "+ordersData.buyer.lastname  : 'Loading...'}
                            id="lastname"
                            placeholder="Last Name"
                            readOnly
                          />
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="lastname"style={{marginLeft:8}} className="form-label">Buyer address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ordersData.buyer ? ordersData.buyer.address+" "+ordersData.buyer.address  : 'Loading...'}
                            id="lastname"
                            placeholder="Last Name"
                            readOnly
                          />
                        </div>
                        <div className="col-12"style={{ textAlign: 'left' }}>
                          <label htmlFor="email"style={{marginLeft:8}} className="form-label">Order date</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={ordersData.created_at ? formatDate(ordersData.created_at) : 'Loading...'}
                              id="email"
                              placeholder="Email"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="phone"style={{marginLeft:8}} className="form-label">Product name </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            value={ordersData.product ? ordersData.product.name : 'Loading...'}
                            placeholder="Phone"
                            readOnly
                          />
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="phone"style={{marginLeft:8}} className="form-label">Quantity </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            value={ordersData.quantity ? ordersData.quantity : 'Loading...'}

                            placeholder="Phone"
                            readOnly
                          />
                        </div>
                        <div className="col-12 "style={{ textAlign: 'left' }}>
                          <label htmlFor="phone"style={{marginLeft:8}} className="form-label">Total amount ($)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={ordersData.price ? ordersData.price : 'Loading...'}
                            id="phone"
                            placeholder="Phone"
                            readOnly
                          />
                        </div>
                        <div className="col-12">
                          {( ordersData.status =='0' &&  
                          <div>
                            <button type="submit" style={{marginRight:8,maxWidth:180}} onClick={handleApproveOrder} className="btn btn-primary">{approveButtonMessage}</button>
                            <button type="submit" style={{marginLeft:8 ,maxWidth:180}} onClick={handleCancelOrder} className="btn btn-danger">Cancel order</button>
                            </div>
                          )}   
                        </div>
                        <div className="col-12">
                        <button type="submit" style={{ maxWidth: "200px",marginLeft:8}} onClick={handleReturn}  className="btn btn-primary">Return</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}