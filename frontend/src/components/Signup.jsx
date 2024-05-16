import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='bg-opacity-60 bg-black h-[100vh] flex items-center justify-center'>
      <div className='bg-white flex flex-col w-1/4 p-6 rounded-md shadow-md'>
        <h1 className='text-2xl font-semibold mb-2'>Sign Up</h1>
        <p className='text-gray-500 mb-4 font-medium'>Enter your details to create an account</p>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>First Name</p>
          <input placeholder='John' type="text" className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'/>
        </div>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>Last Name</p>
          <input placeholder='Doe' type="text" className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'/>
        </div>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>Email</p>
          <input placeholder='johndoe@email.com' type="email" className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'/>
        </div>
        <div className='flex flex-col mb-2'>
          <p className='text-sm font-medium'>Password</p>
          <input type="password" className='border-2 my-2 border-gray-300 py-2 px-3 w-full rounded-md'/>
        </div>
        <button className='bg-black p-2 my-2 text-white rounded-md cursor-pointer hover:bg-opacity-80 transition'>Sign Up</button>
        <p className='flex justify-center my-2 gap-x-2'>
          Already a user?
          <Link to='/signin'>
            <p className='underline'>Login</p>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup