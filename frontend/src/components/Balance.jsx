import React, { useEffect, useState } from 'react'
import axios from "axios"

const Balance = () => {
  const [account, setAccount] = useState({});

  useEffect(() => {
    const getBalance = () => {
      const token = localStorage.getItem('token');
      axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setAccount(response.data.account);
      })
    }

    getBalance();
  }, []);
  const roundedBalance = account.balance ? parseFloat(account.balance.toFixed(3)) : 0;

  return (
    <div className='mx-4 mb-4 p-4'>
        <h1 className='text-lg font-semibold'>Your Balance</h1>
        <p className='text-2xl font-bold text-blue-600'>${roundedBalance}</p>
    </div>
  )
}

export default Balance