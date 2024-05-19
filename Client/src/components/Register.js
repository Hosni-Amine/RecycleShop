import React, {  useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useGeolocated } from "react-geolocated";
import axios from 'axios';
import Georegister from "../components/Georegister.js";

const BASE_URL = 'http://127.0.0.1:8000/api';

export default function Register() {
  const navigate = useNavigate();
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [enableSellerButton, setEnableSellerButton] = useState(false); // State to enable Seller button
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      watchPosition: geolocationEnabled, // Watch for position updates when geolocationEnabled is true
  });

  const handleUserTypeChange = (e) => {
    const userType = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      userType,
    }));
    if (userType === 'Seller') {
      setEnableSellerButton(true);
    } else {
      setEnableSellerButton(false);
    }
  };
  
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    userType:'',
    address: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.lastname.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.password.trim() ||
      !formData.repeatPassword.trim() ||
      formData.password !== formData.repeatPassword
    ) {
      setError('Please fill in all fields correctly');
      return;
    }
    const formData1 = {
      ...formData,
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      }
    };
    signupUser(formData1);
  };

  const signupUser = async (newUser) => {
    try {
      setError("");
      const response = await axios.post(`${BASE_URL}/register`, newUser);
      if(response) {
        
          if(response.status===200 || response.status===201 ){
            navigate('/Auth/Login');  
          }  
          else {
            setError(response.data.message);
          }
      }
      else {
        setError("Server error ! ");
      }
    } catch (error) {
            setError(error.response.data.message);
            console.error('Registration error:', error.response.data.message);
    }
  };

  return (
    <div >
      <div className='container py-5'>
        <h2 className="mb-3 text-center">Register</h2>
        <div className="row g-2 mb-5">
          <div className="col-12">
            <div className="rounded border shadow p-3 text-center h-100">
              <form className="row gx-3 gy-2 align-items-center" onSubmit={submitRegister}>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    id="name"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.lastname}
                    onChange={handleChange}
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                  />
                </div>
                <div className="col-12">
                  <label className="visually-hidden" htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                  />
                </div>
                <div className="col-6">
                  <label className="visually-hidden" htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                    id="address"
                    placeholder="Address"
                  />
                </div>
                  <div className="col-6">
                    <label className="visually-hidden" htmlFor="password">Password</label>
                    <input 
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      id="password"
                      placeholder="Password here"
                    />
                  </div>
                  <div className="col-6">
                    <label className="visually-hidden" htmlFor="repeatPassword">Repeat Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      name="repeatPassword"
                      id="repeatPassword"
                      placeholder="Repeat Password"
                    />
                  </div>
                <div className='col-6'>
                  <label className='visually-hidden' htmlFor='userType'>
                    User Type
                  </label>
                  <select
                    className='form-select'
                    value={formData.userType}
                    onChange={handleUserTypeChange}
                    name='userType'
                    id='userType'
                  >
                    <option value='Client'>Client</option>
                    <option value='Seller'>Seller</option>
                  </select>
                </div>
                {formData.userType === 'Seller' && (
                  <div className='col-12'>
                    <Georegister/>
                  </div>
                )}
                {error && <div className="col-12 text-danger">{error}</div>}
                <div style={{marginTop:15}} className="col-12">
                  <button style={{width:250}} type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
