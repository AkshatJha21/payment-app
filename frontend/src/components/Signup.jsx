import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signup');
          return;
        }
        const response = await axios.get('http://localhost:3000/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
  
    checkAuth();
  }, []);

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      localStorage.setItem("token", response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to signup: ", error);
    };
  };

  return (
    <div className='bg-opacity-60 bg-black h-[100vh] flex items-center justify-center'>
      <div className='bg-white flex flex-col w-full sm:w-2/3 lg:w-1/3 p-6 rounded-md shadow-md mx-6'>
        <h1 className='text-2xl font-semibold mb-2'>Sign Up</h1>
        <p className='text-gray-500 mb-4 font-medium'>Enter your details to create an account</p>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>First Name</p>
          <input 
            placeholder='John' 
            type="text" 
            className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'
            onChange={(e) => {
              setFirstName(e.target.value);
            }}  
          />
        </div>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>Last Name</p>
          <input 
            placeholder='Doe' 
            type="text" 
            className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>Email</p>
          <input 
            placeholder='johndoe@email.com' 
            type="email" 
            className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>Password</p>
          <input 
            type="password" 
            className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={handleClick} className='bg-black p-2 my-2 text-white rounded-md cursor-pointer hover:bg-opacity-80 transition'>Sign Up</button>
        <div className='flex justify-center my-2 gap-x-2'>
          Already a user?
          <Link to='/signin'>
            <p className='underline'>Login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup