import React from 'react'
import Navbar from './Navbar'
import Balance from './Balance'
import Users from './Users'

const Dashboard = () => {
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