import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useDebounce from '../hooks/useDebounce';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);  
  const navigate = useNavigate();
  const debouncedFilter = useDebounce(filter, 600);

  useEffect(() => {
      try {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/api/v1/user/me" , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          setCurrentUserId(response.data.user._id);
        })
      } catch (error) {
        console.error("Error fetching current user: ", error);
      }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedFilter)
      .then(response => {
        setUsers(response.data.user);
      })
  }, [debouncedFilter]);
  return (
    <div className='flex flex-col mx-4 p-4'>
        <h1 className='text-lg font-semibold mb-2'>Users</h1>
        <input 
            type="text" 
            placeholder='Search...'
            className='border-2 border-gray-200 p-2 rounded-md'
            onChange={(e) => {
              setFilter(e.target.value);
            }} 
        />        
        <div className='flex flex-col p-2 '>
          {users.filter(user => user._id !== currentUserId).map((user) => {
            return (
              <div className='flex my-2' key={user._id}>
                <div className='flex items-center gap-x-2 flex-1'>
                    <p className='p-2 bg-blue-300 rounded-full h-10 w-10 text-center'>{user.firstName[0]}</p>
                    <p className='font-semibold'>{user.firstName} {user.lastName}</p>
                </div>
                <button 
                  onClick={() => {
                    navigate('/send?id=' + user._id + "&name=" + user.firstName);
                  }}
                  className='bg-black text-white p-2 rounded-md text-sm font-light hover:bg-opacity-80 transition-all'
                >
                  Send Money
                </button>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Users