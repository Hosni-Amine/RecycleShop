import React, { useState,useContext, useEffect } from 'react';
import { getOrders } from '../../axiosAPI/Orders.js';
import { UserContext } from '../../index';
import { Link } from 'react-router-dom';

export default function OrderList() {
  const [ordersData, setOrdersData] = useState([]);
  const {currentUser} = useContext(UserContext);

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(currentUser);
        const sortedOrders = response.data.orders.sort((a, b) => a.status - b.status);
        setOrdersData(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className='bg-light'>
      <div className='container py-5'>
        <h2 className="mb-3 text-center">Orders list</h2>
        <div className="row g-2 mb-5">
          <ul className="navbar-nav justify-content-end flex-grow-1">
            <li className="nav-item" style={{ marginTop: 20 }}>
              <div className="rounded border shadow p-4 text-center h-100">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="center-cell">Order ID</th>
                      <th className="center-cell">Product</th>
                      <th className="center-cell">Client</th>
                      <th className="center-cell">Order date</th>
                      <th className="center-cell">Order total</th>
                      <th className="center-cell">State</th>
                      <th className="center-cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersData.map((order) => (
                      <tr key={order.id} style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>
                        <td className="center-cell" style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>{order.id}</td>
                        <td className="center-cell" style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>{order.product.name}</td>
                        <td className="center-cell" style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>{order.buyer.name} {order.buyer.lastname}</td>
                        <td className="center-cell"style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>
                        {formatDate(order.created_at)}
                          </td>
                        <td className="center-cell"style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>$ {order.price}</td>
                        <td className="center-cell"style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>
                          {order.status === 1 ? "Approved" : "On Hold"}
                        </td>
                        <td className="center-cell" style={{ backgroundColor: order.status === 1 ? 'lightgreen' : 'inherit' }}>
                          <Link to={`/Seller/orderDetails/${order.id}`} style={{ marginLeft: 20 }}>
                            <button style={{ width: 100 }} className={order.status === 1 ? 'btn btn-success' : 'btn btn-primary' }>Details</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};