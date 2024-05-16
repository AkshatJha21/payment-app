import React from 'react'

const Users = () => {
  return (
    <div className='flex flex-col mx-4 p-4'>
        <h1 className='text-lg font-semibold mb-2'>Users</h1>
        <input 
            type="text" 
            placeholder='Search...'
            className='border-2 border-gray-200 p-2 rounded-md'    
        />
        <div className='flex p-2 my-2'>
            <div className='flex items-center gap-x-2 flex-1'>
                <p className='p-2 bg-blue-300 rounded-full h-10 w-10 text-center'>A</p>
                <p className='font-semibold'>Akshat Jha</p>
            </div>
            <button className='bg-black text-white p-2 rounded-md text-sm font-light hover:bg-opacity-80 transition-all'>Send Money</button>
        </div>
    </div>
  )
}

export default Users