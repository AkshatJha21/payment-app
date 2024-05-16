import React, { useEffect, useState } from 'react'
import axios from "axios"

const Balance = () => {
  return (
    <div className='mx-4 mb-4 p-4'>
        <h1 className='text-lg font-semibold'>Your Balance</h1>
        <p className='text-2xl font-bold text-blue-600'>$1000.00</p>
    </div>
  )
}

export default Balance