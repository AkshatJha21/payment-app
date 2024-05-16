import React from 'react'
import UserButton from './UserButton'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4 shadow-sm mb-4'>
        <h1 className='text-2xl font-bold'>Payment App</h1>
        <UserButton />
    </div>
  )
}

export default Navbar