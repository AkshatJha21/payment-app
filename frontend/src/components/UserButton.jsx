import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserButton = () => {
  const [user, setUser] = useState({});

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
  return (
    <div className='flex gap-x-2 items-center'>
        <p>Hello, {user.firstName}</p>
        <div className='p-2 bg-blue-300 rounded-full h-10 w-10 text-center'>
            {initials}
        </div>
    </div>
  )
}

export default UserButton