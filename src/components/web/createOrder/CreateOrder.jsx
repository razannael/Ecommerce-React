import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { createOrderSchema} from '../validation/validate.js';
import axios from 'axios';
import {toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
export default function CreateOrder() {
  const navigate = useNavigate();
  const  initialValues={
    phone :'',
    address :'',
    couponName :'',
   };
   const onSubmit = async (users)=> {
  try{  
    const token = localStorage.getItem("userToken");
     const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`,
     users,
     {headers:{Authorization:`Tariq__${token}`}});
     if (data.message=='success'){
      toast.success('Your Order Created Successfully ', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        navigate('/profile');
     }}catch(error){
     }
    };
     const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:createOrderSchema,
     });


    const inputs =[
     {
       id :'phone',
       type : 'phone',
       name : 'phone',
       title : 'user phone',
       value : formik.values.phone,
     },
     {
       id : 'address',
       type : 'address',
       name : 'address',
       title : 'user address',
       value : formik.values.address,
     },
     {
        id : 'couponName',
        type : 'text',
        name : 'couponName',
        title : 'coupon Name',
        value : formik.values.couponName,
      },
    ];


    const renderInputs = inputs.map((input,index)=>
        <Input type={input.type} 
        id={input.id}
        name={input.name} 
        title={input.title}
        value={input.value} 
        key={index} 
        errors={formik.errors}
        onChange={input.onChange || formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        />
    )
  return (
    <>
     <div className='container w-50 vh-100 text-center mt-5 submitbutton'>
     <h2>Create Order</h2>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button className='btn w-25 mt-4'  type='submit' disabled={!formik.isValid}> Order </button>
      </form>
     </div>
    </>
  )
}
