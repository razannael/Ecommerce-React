import React from 'react'
import {FaStar,FaStarHalfAlt} from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai'
import '../products/Product.css'
export default function Stars({rating}) {
 const ratingStar = Array.from({length:5},(elem,index)=>{
  let number = index + 0.5 ;
  
  return (
    <span key={index}>
      {rating >= index + 1 ? (
        <FaStar className="icon fs-4" />
      ) : rating >= number ? (
        <FaStarHalfAlt className="icon fs-4" />
      ) : (
        <AiOutlineStar className="icon fs-4" />
      )}
    </span>
  );
 })
  return (
    <div className='wrapper'>
      <div className='icon-style'>
         {ratingStar}
      </div>
    </div>
  )
}
