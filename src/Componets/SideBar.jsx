import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink to="/add" className="flex gap-3 p-2 border items-center border-gray-300 border-r-0 px-3" >
                <img src={assets.add_icon} alt="" className='w-5 h-5'/>
                <p className='hidden md:block'>Add Item</p>
            </NavLink>
                        <NavLink to="/list" className="flex  p-2 gap-3 border items-center border-gray-300 border-r-0 px-3">
                <img src={assets.order_icon} alt="" className='w-5 h-5'/>
                <p className='hidden md:block'>List Item</p>
            </NavLink>
                        <NavLink to="/order" className="flex p-2  gap-3 border items-center border-gray-300 border-r-0 px-3">
                <img src={assets.order_icon} alt="" className='w-5 h-5'/>
                <p className='hidden md:block'>Order</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar