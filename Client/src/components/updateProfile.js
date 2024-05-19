import React, { useContext, useState } from 'react';
import { UserContext } from '../index';
import { updateProfile } from '../axiosAPI/Users.js';
import { useNavigate } from 'react-router-dom';
import Georegister from "../components/UpdateGeo.js";

export default function UpdateProfile() {
  const { currentUser,setcurrentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(currentUser);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (userData.password !== userData.repeatPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (userData.password && userData.password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }
    try {
      const dataToUpdate = { ...userData };
      if (!userData.password || userData.password.length < 6) {
        delete dataToUpdate.password;
      } 
      const response = await updateProfile(dataToUpdate);
      if (response.data) {
        setcurrentUser(response.data.user)
        navigate('/userProfile');
      } else {
        setError(response.response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating profile');
    }
  };
  


  return (
    <div>
      <div className='container py-5'>
        <h2 className="mb-3 text-center">Update profile</h2>
        <div className="row g-2 mb-5">
          <div className="col-12">
            <div className="rounded border shadow p-3 text-center h-100">
              <form className="row gx-3 gy-2 align-items-start" onSubmit={handleSubmit}>
                <div className="col-12 " style={{ textAlign: 'left' }}>
                  <label htmlFor="firstname" style={{ marginLeft: 8 }} className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userData.name || ''}
                    id="firstname"
                    name="name"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 " style={{ textAlign: 'left' }}>
                  <label htmlFor="lastname" style={{ marginLeft: 8 }} className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userData.lastname || ''}
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12" style={{ textAlign: 'left' }}>
                  <label htmlFor="email" style={{ marginLeft: 8 }} className="form-label">Email</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input
                      type="email"
                      className="form-control"
                      value={userData.email || ''}
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 " style={{ textAlign: 'left' }}>
                  <label htmlFor="phone" style={{ marginLeft: 8 }} className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userData.phone || ''}
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6" style={{ marginTop: 30 }} >
                  <label className="visually-hidden" htmlFor="password">Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    value={userData.password}
                    onChange={handleChange}
                    name="password"
                    id="password"
                    placeholder="Password here"
                  />
                </div>
                <div className="col-6" style={{ marginTop: 30 }}>
                  <label className="visually-hidden" htmlFor="repeatPassword">Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={userData.repeatPassword}
                    onChange={handleChange}
                    name="repeatPassword"
                    id="repeatPassword"
                    placeholder="Repeat Password"
                  />
                </div>
                <div className="col-12">
                  {userData.userType === 'Seller' && (
                    <div className='col-12'>
                      <Georegister/>
                    </div>
                    )}
                  </div>
                <div className="col-12">
                  {error && <div className="col-12 text-danger">{error}</div>}
                  <button  onClick={handleSubmit} style={{width:250}} className="btn btn-primary">Submit changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
