import React from 'react';
import {useContext} from 'react';
import { AppContext } from '..';

export default function CartItem({ product }) {

    const {updatecartItem} = useContext(AppContext);
    
    function decrease() {
        if (product.quantity > 0) {
            product.quantity -= 1;
            updatecartItem(product);
        }

    }
    function increase() {
        product.quantity += 1;
        updatecartItem(product);
    }
 
    if(product.quantity > 0 )
    {
        return (
        <li className="nav-item" style={{ marginTop: 20 }}>
            <div className="rounded border shadow p-3 text-center h-100">
                <div className="row">
                    <div className="col-6 col-lg-4 col-xl-4">
                        <img src={`http://127.0.0.1:8000/products/${product.image}`} className="img-fluid" alt="..." style={{ height: 130 }} />
                    </div>
                    <div className="col-6 col-lg-4 col-xl-4">
                        <h4 className="py-2">{product.name}</h4>
                        <h6> Description : {product.description}</h6>
                        <h6> Category : {product.category}</h6>
                        <h6> Price per Kg : ${product.price}</h6>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-4">
                    <h4 className="mb-2">Total : ${product.price * product.quantity}</h4>
                    <a className="btn btn-warning btn-sm" onClick={increase}  role="button">
                    +
                    </a>
                    <a className="btn btn-sm m-2 disabled">{product.quantity}</a>
                    <a type="button" className="btn btn-warning btn-sm" onClick={decrease} disabled={product.quantity === 0}  role="button">
                    -
                    </a>
                </div>
                </div>
                
            </div>
        </li>
        );
    }
}
