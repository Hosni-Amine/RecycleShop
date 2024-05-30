import React, { useEffect,useContext , useState} from 'react';
import './AdminProductList.css'; 
import { AppContext, UserContext } from '../index.js';
import AddProduct from '../components/Addproduct.js';
import EditProduct from '../components/Editproduct.js';

export default function Product() {

  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const { productList , DeleteProductFromList} = useContext(AppContext);
  const { currentUser } = useContext(UserContext);
  



  useEffect(() => {
    if (addForm) {
      window.history.pushState(null, '', '/Seller/products/addProduct'); // Add "/add" to the URL
    } else {
      window.history.pushState(null, '', window.location.pathname.replace('/addProduct', '')); // Remove "/add" from the URL
    }
  }, [addForm]);
  useEffect(() => { 
    if (editForm) {
      window.history.pushState(null, '', `/Seller/products/editProduct`); // Add "/edit/:id" to the URL
    } else {
      window.history.pushState(null, '', window.location.pathname.replace(`/Seller/products/editProduct`, '')); // Remove "/edit/:id" from the URL
    }
  }, [editForm, productToEdit]);

  const toggleEditForm = (product) => {
    setAddForm(false);
    setProductToEdit(product);
    setEditForm(!editForm);
  };


  function toggleAddForm() {
    setEditForm(false);
    setAddForm(!addForm);
  };

  const deleteProduct = (productId) => {
    DeleteProductFromList(productId)

  };



  return (
        <ul className="navbar-nav justify-content-end flex-grow-1">
          {currentUser.userType === "Seller" && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button 
                className="buttonsubmit"
                style={{ maxWidth: "200px", marginTop: "20px" }}
                onClick={toggleAddForm}
                type="submit">
                Add product
              </button>
            </div>
          )}
          {addForm && <AddProduct toggleAddForm={toggleAddForm} />}
          {editForm  && <EditProduct product={productToEdit} toggleEditForm={toggleEditForm} />}      
        <li className="nav-item" style={{ marginTop: 20 }}>
          <div className="rounded border shadow p-4 text-center h-100">      
            <table className="table">
            <thead>
              <tr>
                <th className="center-cell">Product ID</th>
                <th className="center-cell">Product Image</th>
                <th className="center-cell">Product Name</th>
                <th className="center-cell">Description</th>
                <th className="center-cell">Quantity</th>
                <th className="center-cell">Category</th>
                <th className="center-cell">Unit Price</th>
                <th className="center-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id}>
                  <td className="center-cell">{product.id}</td>
                  <td className="center-cell">
                  <img src={`http://127.0.0.1:8000/products/${product.image}`} className="img-fluid" alt="" style={{ height: 100 }} />
                  </td>
                  <td className="center-cell">{product.name}</td>
                  <td className="center-cell">{product.description}</td>
                  <td className="center-cell">{product.quantity}</td>
                  <td className="center-cell">{product.category}</td>
                  <td className="center-cell">${product.price}</td>
                  <td className="center-cell">
                    {currentUser.userType === "Seller" && (
                    <button style={{margin:5}} className="btn btn-outline-primary btn-sm" onClick={() => {toggleEditForm(product)} }>Edit</button>
                    )}
                    <button style={{margin:5}}
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              }
            </tbody>
            </table>
          </div>
        </li>
      </ul>
  );
}
