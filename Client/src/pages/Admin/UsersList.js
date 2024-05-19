import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../axiosAPI/Users.js';
import { updateProfile } from '../../axiosAPI/Users.js';

export default function UsersList() {
  const [usersData, setUsersData] = useState([]);

  const fetchUsers = async () => {
    try {
      const userData = await getAllUsers();
      setUsersData(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeUserType = async (userId, newType) => {
    const userIndex = usersData.findIndex(user => user.id === userId);
    const updatedUser = { ...usersData[userIndex] };
    updatedUser.userType = newType;
    try {
      const response = await updateProfile(updatedUser);
      if (response) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <div>
            <div className='container py-5'>
                <h2 className="mb-3 text-center">Users list</h2>
                <div className="row g-2 mb-5">
                  <ul className="navbar-nav justify-content-end flex-grow-1">
                    <li className="nav-item" style={{ marginTop: 20 }}>
                      <div className="rounded border shadow p-4 text-center h-100">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="center-cell">User name</th>
                              <th className="center-cell">Address</th>
                              <th className="center-cell">User email</th>
                              <th className="center-cell">User phone</th>
                              <th className="center-cell">User type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usersData.map((user) => (
                              <tr key={user.id}>
                                <td className="center-cell">
                                  {user.userType === "Admin" ? `${user.name+" "+user.lastname} (Admin)` : user.userType === "Seller" ? `${user.name+" "+user.lastname} (Seller)` : user.name+" "+user.lastname}
                                </td>
                                <td className="center-cell">{user.address}</td>
                                <td className="center-cell">{user.email}</td>
                                <td className="center-cell">{user.phone}</td>
                                <td>
                                <select
                                  value={user.userType}
                                  onChange={(e) => handleChangeUserType(user.id, e.target.value)}>
                                  <option value="Admin">Admin</option>
                                  <option value="Seller">Seller</option>
                                  <option value="Client">Client</option>
                                </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
  );
}