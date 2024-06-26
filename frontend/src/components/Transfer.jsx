import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Transfer = () => {
  const [amount, setAmount] = useState(0);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };
  
    checkAuth();
  }, []);

  return (
    <div className='bg-opacity-60 bg-black h-[100vh] flex items-center justify-center'>
      <div className='bg-white flex flex-col w-full sm:w-2/3 lg:w-1/3 p-6 rounded-md shadow-md'>
        <h1 className='text-2xl font-semibold mb-2'>Send Money</h1>
        <p className='text-gray-500 mb-4 font-medium'>Enter amount to continue</p>
        <div className='flex items-center justify-center gap-x-2'>
          <div className='p-2 bg-blue-300 rounded-full h-10 w-10 text-center'>
              {name[0].toUpperCase()}
          </div>
          <h1 className='text-2xl font-semibold my-2'>{name}</h1>
        </div>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>Amount</p>
          <input 
            type="number" 
            className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'
            onChange={(e) => {
              const send = parseFloat(e.target.value);
              setAmount(send);
            }}
          />
        </div>
        <div className='flex items-center justify-end gap-x-4'>
          <button 
            onClick={() => {
              axios.post('http://localhost:3000/api/v1/account/transfer', {
                to: id,
                amount
              }, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem('token')
                }
              }).then((res) => {
                toast.success('Transfer complete');
                navigate('/dashboard');
              }).catch((err) => {
                toast.error('Transaction failed');
                console.error('Error: ', err);
              });
            }}
            className='flex-1 bg-black p-2 my-2 text-white rounded-md cursor-pointer hover:bg-opacity-80 transition'
          >
            Send Money
          </button>
          <Link to='/dashboard'>
            <button className='bg-rose-500 text-white py-2 px-4 rounded-md hover:opacity-80 transition-all'>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Transfer