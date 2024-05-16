import React, { useEffect, useState } from 'react'
import axios from "axios"

const Balance = () => {
  const [amount, setAmount] = useState({});

  useEffect(() => {
    const getBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          console.log(response.data);
          setAmount(response.data.account);
        });
      } catch (error) {
        console.error("Error fetching balance: ", error);
      };

      getBalance();
    };
  }, []);

  return (
    <div className='mx-4 mb-4 p-4'>
        <h1 className='text-lg font-semibold'>Your Balance</h1>
        <p className='text-2xl font-bold text-blue-600'>${amount.balance}</p>
    </div>
  )
}

export default Balance