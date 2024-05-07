import React from 'react'
import Categories from '../categories/Categories.jsx'
import { MdShoppingCart } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { GiAmpleDress } from "react-icons/gi";
import './Home.css'

export default function Home() {
  
  return (
    <> 
    <div className='heading  p-5'>
       <h1 className='pt-5 pb-3'>Welcome to Razan Shop</h1>
       <div className='icons'>
       <MdShoppingCart />
       <AiFillShopping />
      <GiClothes />
      <GiAmpleDress />
       </div>
    </div>
      <Categories/>
    </>
  )
}
