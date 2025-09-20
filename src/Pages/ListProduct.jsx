import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { MdCancel } from "react-icons/md";


const ListProduct = ({token}) => {

  const [list,setList]=useState([])

  const fetchList = async () =>
  {
    try {
      const response = await axios.get(backendUrl + '/product/get');
     if(response.data.success)
     {
       setList(response.data.products)
     }
     else
     {
      toast.error(response.data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) =>
  {
    try {
const response = await axios.post(`${backendUrl}/product/delete`, { id }, {
  headers: { token },
});
      if(response.data.success)
      {
        toast.success(response.data.message)
        await fetchList();
      }else
      {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>
  {
    fetchList();
  },[])
  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='flex gap-2 flex-col'>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {
        list.map((item,index)=>
        
      <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] '>
<img src={item.image[0]} alt="" className='w-12 h-12' />
<p>{item.name}</p>
<p>{item.category}</p>
<p>{item.price}</p>
<p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer items-end'>
  <MdCancel className='text-red-500' />

</p>
        </div>
        )
      }
    </div>

    </>
  )
}

export default ListProduct