import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg bg-purple-400 flex justify-between p-3 '>
        <h1 className='font-bold'>PassMaps</h1>
        <ul className='flex gap-6'>
            <li className='hover:font-bold cursor-pointer'>Home</li>
            <li className='hover:font-bold cursor-pointer'>About</li>
            <li className='hover:font-bold cursor-pointer'>Contact Us</li>
        </ul>
    </nav>  
    )
}

export default Navbar
