import React, { useContext, useState } from 'react';
import { UserContext } from '../index';
import {AppContext } from '../index';
import { useNavigate  } from 'react-router-dom';
import { login } from '../axiosAPI/Users.js';
import { getProductswithlocation } from '../axiosAPI/Products.js';

export default function Login() {
  
  const navigate = useNavigate();
  const { setcurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setProductList} = useContext(AppContext);

  const submitLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    setError('');
    const credentials = {email,password};
    loginUser(credentials);
    };

  const loginUser = async (credentials) =>  {
      try {
        const response = await login(credentials);
        if(response)
        {
        if(response.data.user)  
          {
            console.log(response.data)
            setcurrentUser(response.data.user);
            const fetchData = async () => {
              try {
                const products = await getProductswithlocation(response.data.user);        
                setProductList(products);
                console.log(products)
              } catch (error) {
                console.error('Error fetching data:', error);
                setProductList([]);
              }
            };
    
            fetchData();
            if(response.data.user.userType ==="Seller"){
              navigate('/Seller/dashboard');
            }
            else if(response.data.user.userType ==="Admin"){
              navigate('/Admin/dashboard');
            }else{
              navigate('/Home');
            }
          }
          else{
            setError(response.data.message);
          }
        }
        else{
          setError("Server error ! ");
        }
      } catch (error) {
        console.log(error)
        setError(error);
      }
    };

  return (
    <div >
      <div className='container py-5'>
        <h2 className="mb-3 text-center">Login</h2>
        <div className="row g-2 mb-5" style={{margin:"0px 100px 0px 100px"}}>
          <div className="col-12">
            <div className="rounded border shadow p-3 text-center h-100">
              <form className="row gx-3 gy-2 align-items-center" onSubmit={submitLogin}>
                <div className="col-12">
                  <label className="visually-hidden" htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="visually-hidden" htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Password "
                  />
                </div>
                {error && <div className="col-12 text-danger">{error}</div>}
                <div className="col-12">
                  <button style={{width:250}} type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
