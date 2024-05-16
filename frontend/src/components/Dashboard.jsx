import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Balance from './Balance'
import Users from './Users'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
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
    <div>
      <Navbar />
      <Balance />
      <hr />
      <Users />
    </div>
  )
}

export default Dashboard