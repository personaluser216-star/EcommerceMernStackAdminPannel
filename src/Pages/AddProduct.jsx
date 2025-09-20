import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'

const AddProduct = ({token}) => {

  const[image1,setImage1]=useState(false)
  const[image2,setImage2]=useState(false)
  const[image3,setImage3]=useState(false)
  const[image4,setImage4]=useState(false)

  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
  const[price,setPrice]=useState("");
  const[category,setCategory]=useState("Men");
  const[subCategory,setSubCategory]=useState("Topwear");
  const[bestseller,setBestseller]=useState(false);
  const [sizes, setSizes] = useState([]);

const OnSubmitHandler = async (e) => {
  e.preventDefault(); // ✅ Correct event method
console.log(bestseller)
  try {
    const formData = new FormData(); // ✅ Capital "F" in FormData

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subCategory);
    formData.append("bestSeller", bestseller.toString());
    formData.append("sizes", JSON.stringify(sizes));

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    
    const response = await axios.post(
  backendUrl + "/product/add",
  formData,
  {
    headers: {
    token
    }
  }
);
  if(response.data.success)
  {
    toast.success(response.data.message || "Product added sucessfully..");
    setName("");
    setDescription("");
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
    setPrice('');
    
  }
  else
  {
toast.error(response.data.message || "Failed to added data")}
  } catch (error) {
    toast.error(error.message);
toast.error("Something went wrong!");
  }
};


  return (
  <form onSubmit={OnSubmitHandler} className='flex flex-col w-full items-start gap-3'> 

    <div>
      <p>Upload Image</p>
      <div className='flex gap-2'>
        <label htmlFor='image1'>
          <img  className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=''/>
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
        </label>
         <label  htmlFor='image2'>
          <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=''/>
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
        </label>
         <label htmlFor='image3'>
          <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=''/>
          <input  onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
        </label>
         <label htmlFor='image4'>
          <img  className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=''/>
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
        </label>
      </div>
    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Name</p>
      <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Type Here' required className='border w-full max-w-[500px] px-3 py-2' />
    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Description</p>
      <input type="textarea" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Write Content Here" required className='border w-full max-w-[500px] px-3 py-2' />
    </div>
    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div>
        <p className='mb-2'>Product Category</p>
        <select onChange={(e)=>setCategory(e.target.value)} value={category}  className='w-full px-3 py-2'>
          <option value="Men">Men</option>
          <option value="WoMen">WoMen</option>
          <option value="Kids">Kids</option>


        </select>
      </div>
       <div>
        <p className='mb-2'>Sub Category</p>
        <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory}  className='w-full px-3 py-2'>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>


        </select>
      </div>
      <div>
        <p className='mb-2'>Product Price</p>
<input type='Number' onChange={(e)=>setPrice(e.target.value)} value={price} placeholder='25' className='w-full px-3 py-2 sm:w-[120px]'/>
      </div>
    </div>
    <div>
      <p className='mb-2'>Product Size</p>
     <div className='flex gap-3'>
  {["S", "M", "L", "XL", "XXL"].map((size) => (
    <div
      key={size}
      onClick={() =>
        setSizes((prev) =>
          prev.includes(size)
            ? prev.filter((item) => item !== size)
            : [...prev, size]
        )
      }
    >
      <p
        className={`${
          sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
        } px-3 py-1 cursor-pointer`}
      >
        {size}
      </p>
    </div>
  ))}
</div>
    </div>
  <div className='flex gap-2 mt-2'>
  <input
    onChange={() => setBestseller((prev) => !prev)}
    checked={bestseller}
    type="checkbox"
    id='bestseller'
  />
  <label className='cursor-pointer' htmlFor='bestseller'>
    Add To Bestseller
  </label>
</div>

    
    <button type='submit'  className='w-28 py-3 mt-4 bg-black text-white' >Add</button>
  </form>
  )
}

export default AddProduct