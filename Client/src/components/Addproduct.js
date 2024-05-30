import React, { useContext, useState } from 'react';
import { AppContext } from '../index';

const initialFormData = {
  name: '',
  description: '',
  category: '',
  price: '',
  quantity: '', 
  image: null,
};

export default function AddProduct({ toggleAddForm }) {
  const { addProductToList } = useContext(AppContext);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // If the input is a file input, save the file
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // Store the image file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
    if (checkValidation()) {
      const updatedFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        updatedFormData.append(key, value);
      });
      addProductToList(updatedFormData);
      setFormData(initialFormData);
      toggleAddForm();
    } else {
      alert('Please fill in all required fields and provide a valid price.');
    }
  };

  const checkValidation = () => {
    const { name, description, price, quantity, image } = formData;
    return name && description && !isNaN(parseFloat(price)) && parseFloat(price) > 0 && !isNaN(parseInt(quantity)) && parseInt(quantity) > 0 && image;
  };

  return (
    <li className="nav-item" style={{ marginTop: 20 }}>
      <div className="rounded border shadow p-4 text-center h-100">
        <div className="container my-4">
          <div className="row">
            <div className="col-md-12 mx-auto rounded border p-4">
              <h2 className="text-center mb-5">Add Product</h2>
              <form onSubmit={handleSubmit}>
                {/* Form inputs */}
                {Object.keys(formData).map((key, index) => (
                  <div key={index} className="row mb-3">
                    <label className="col-sm-4 col-form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    <div className="col-sm-8">
                      {key === 'image' ? (
                        <input
                          className="form-control"
                          name={key}
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      ) : (
                        <input
                          className="form-control"
                          name={key}
                          type={key === 'price' || key === 'quantity' ? 'number' : 'text'}
                          value={formData[key]}
                          onChange={handleChange}
                        />
                      )}
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
                    <button className="btn btn-secondary" onClick={toggleAddForm}>
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
