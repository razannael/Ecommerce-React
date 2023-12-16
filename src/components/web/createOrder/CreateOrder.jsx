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
    coupon :'',
   };
   const onSubmit = async (users)=> {
  try{  
    const token = localStorage.getItem("userToken");
     const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`,
     users,
     {headers:{Authorization:`Tariq__${token}`}});
     console.log(data)
     if (data.message=='success'){
      toast.success('Your Order Created Successfully ', {
        position: "bottom-center",
        autoClose: false,
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
        id : 'coupon',
        type : 'text',
        name : 'coupon',
        title : 'coupon',
        value : formik.values.coupon,
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
     <div className='container'>
     <h2>Create Order</h2>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button type='submit' disabled={!formik.isValid}>Order</button>
      </form>
     </div>
    </>
  )
}
