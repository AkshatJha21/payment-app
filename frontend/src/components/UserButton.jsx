import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserButton = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/api/v1/user/me" , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data.user);
      })
  }, []);

  const initials = user.firstName ? user.firstName[0].toUpperCase() : '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  }
  return (
    <div className='flex gap-x-2 items-center'>
        <p>Hello, {user.firstName}</p>
        <div className='p-2 bg-blue-300 rounded-full h-10 w-10 text-center'>
            {initials}
        </div>
        <button onClick={handleLogout} className='border-2 border-gray-300 px-4 py-2 rounded-md text-sm ml-2 hover:bg-gray-300 transition-all'>
          Logout
        </button>
    </div>
  )
}

export default UserButton