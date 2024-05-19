import React from 'react';
import CartItem from '../components/CartItem';
import { useContext } from 'react';
import { AppContext } from '../index.js';
import { UserContext } from '../index.js';
import { addOrders } from '../axiosAPI/Orders.js';
import { useNavigate  } from 'react-router-dom';


export default function ShoppingCart() {
  const { cartList ,setCartList} = useContext(AppContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

 

  let total = 0;
  
  const handleSubmit = async () => {
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (isConfirmed) {
      const orders = {
        products: cartList, 
        buyerid: currentUser.id
      };  
      try {
        const responses = await addOrders(orders);
        const allOrdersSuccessful = responses.every(response => response.order);
        if (allOrdersSuccessful) {
          window.alert("Order successfully created");
          navigate('/home')
          setCartList([]); 
          // Clear cart list if all orders were successful
        } else {
        window.alert("Some orders failed to create");
        }
      } catch (error) {
        window.alert("Error submitting orders:', error");
      }
    }
  };
  

  const CartTotal = () => {
    if (cartList) {
      total = 0;
      cartList.forEach((item) => {
        total += item.price * item.quantity;
      });
    }   

    return (
      <ul className="navbar-nav justify-content-end flex-grow-1">
        <li className="nav-item">
          <div className="rounded border shadow p-4 text-center h-100">
            
            <h4 style={{ display: "inline-block" , marginTop:15}}>
              Total price: ${total}
              { total !=0 && (<button className="buttonsubmit"
                style={{ margin: "20px 0px 0px 20px"}}
                onClick={handleSubmit}
                type="submit">
                Submit order
              </button>)}
            </h4>
          </div>
        </li>
      </ul>
    );
  };

  return (
    <div className="">
      <div className="container py-5">
      <div className="row justify-content-center align-items-center" style={{  margin: '0px -3px 17px -3px', borderRadius: '10px' }}>
            <div className="col-12 d-flex justify-content-center" >   
                
                <div className="card1" style={{margin:"27px 0px"}}>
                    <span>Shopping cart</span>
                    <h3>By miled</h3>
                </div>
                </div>
                </div>
        
        <div className="g-2 mb-5">
          <CartTotal />
          <ul className="navbar-nav justify-content-end flex-grow-1">
            {cartList && cartList.length > 0 ? (
              cartList.map((product, index) => (
                <div key={index}>
                  <CartItem product={product} />
                </div>
              ))
            ) : (
              <div className="rounded border shadow p-4 text-center h-100">
                <h4>Your cart is empty</h4>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}