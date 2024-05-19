import React, { useContext} from 'react';
import { useNavigate  } from 'react-router-dom';
import { AppContext, UserContext } from '../index.js';

export default function ProductItem({ product }) {
  const navigate = useNavigate();
  const { addProductToCart } = useContext(AppContext);
  const { currentUser } = useContext(UserContext);

  const checkadd = (product) => {
    if (currentUser.userType === 'Client') {
      addProductToCart(product);
    } else {
      navigate('/Auth/Login');
    }
  };


    return (
        <div className="card">
      <div className="content">
      <img src={`http://127.0.0.1:8000/products/${product.image}`} className="img-fluid" alt="..." style={{ height: 150 }} />

        <div className="title">{product.name}</div>
          <div className="description" >{product.category}</div>
        <div className="price">${product.price}/Kg</div>
        <div className="description" style={{maxHeight: 20}}>{product.description}</div>
      </div>
      {currentUser.userType !== 'Admin' && currentUser.userType !== 'Seller' && (
        <button type="button" onClick={() => checkadd(product)} className="">
          Add to Cart
        </button>
      )}
    </div>  

  
          
    );
}