import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../index';

export default function EditProduct({ product, toggleEditForm }) {
  const { updateProductItem } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '', // Add quantity field
  });

  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity, // Initialize quantity with product data
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkValidation = () => {
    const { name, description, price, quantity } = formData;
    return (
      name &&
      description &&
      !isNaN(parseFloat(price)) &&
      parseFloat(price) > 0 &&
      !isNaN(parseInt(quantity)) &&
      parseInt(quantity) > 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkValidation()) {
      const updatedProduct = {
        id: product.id,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      };

      try {
        const response = await updateProductItem(updatedProduct,updatedProduct.id);
        console.log(response); // Handle success response
        toggleEditForm();
      } catch (error) {
        console.error('Error updating product:', error); // Handle error
      }
    } else {
      alert('Please fill in all required fields and provide valid values.');
    }
  };

  return (
    <li className="nav-item" style={{ marginTop: 20 }}>
      <div className="rounded border shadow p-4 text-center h-100">
        <div className="container my-4">
          <div className="row">
            <div className="col-md-8 mx-auto rounded border p-4">
              <h2 className="text-center mb-5">Edit Product</h2>
              <form onSubmit={handleSubmit}>
                {/* Form inputs */}
                {Object.keys(formData).map((key, index) => (
                  <div key={index} className="row mb-3">
                    <label className="col-sm-4 col-form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <div className="col-sm-8">
                      <input
                        className={key === 'price' || key === 'quantity' ? 'form-control' : 'form-control'}
                        name={key}
                        type={key === 'price' || key === 'quantity' ? 'number' : 'text'}
                        value={formData[key]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="offset-sm-4 col-sm-4 d-grid">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                  <div className="col-sm-4 d-grid">
                    <button className="btn btn-secondary" onClick={toggleEditForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
