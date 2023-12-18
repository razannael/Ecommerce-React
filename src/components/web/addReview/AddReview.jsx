import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { addReviewSchema} from '../validation/validate.js';
import axios from 'axios';
import {toast } from 'react-toastify';
import './AddReview.css'
export default function AddReview() {
  
  const  initialValues={
    comment :'',
    rating :'',
   };
   const onSubmit = async  users=> {
    try{
        const token = localStorage.getItem("userToken");
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/656afed9415e5e5f8d84871f/review`,
        users,
        {headers:{Authorization:`Tariq__${token}`}});
        if (data.message=='success'){
         toast.success('Your Review added successfully ', {
           position: "bottom-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
           });
           
        }
    }catch(error){}

    };
     const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:addReviewSchema,
     });


    const inputs =[
     {
       id :'comment',
       type : 'comment',
       name : 'comment',
       title : 'Add Comment : ',
       value : formik.values.comment,
     },
     {
       id : 'rating',
       type : 'number',
       step : '0.5',
       name : 'rating',
       title : 'Rating : (from 0 up to 5)',
       value : formik.values.rating,
     }
    ];


    const renderInputs = inputs.map((input,index)=>
        <Input type={input.type} 
        id={input.id}
        name={input.name} 
        title={input.title}
        value={input.value} 
        step = {input.step}
        key={index} 
        errors={formik.errors}
        onChange={input.onChange || formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        />
    )
  return (
    <div className='text-center'>
     <div className='container mt-3 w-50 text-center'>
      <form className='' onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <div className='yourReview'>
        {renderInputs}
        <button className='btn '  type='submit' disabled={!formik.isValid}> Submit!</button>
        </div>
     
      </form>
     </div>
    </div>
  )
}
