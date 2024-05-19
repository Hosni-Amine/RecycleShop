import React, { useContext } from 'react';
import Products from '../../components/products.js';
import { AppContext } from '../../index.js';

export default function ProductList() {

    const { productList } = useContext(AppContext);

    const total = productList.length;

    return (
        <div>
            <div className='container py-5'>
                <h2 className="mb-3 text-center">Product list</h2>
                <div className="row g-2 mb-5">
                    <ul className="navbar-nav justify-content-end flex-grow-1">
                        <li className="nav-item" style={{ marginTop: 20 }}> 
                            <div className="rounded border shadow p-4 text-center h-100">
                                <h4 style={{ display: "inline-block" }}>Number of products : {total} 
                                </h4>
                            </div>  
                        </li>
                        <Products/>
                    </ul>
                </div>
            </div>
        </div>
    );
}
