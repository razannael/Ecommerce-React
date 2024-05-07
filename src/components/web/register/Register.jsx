import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { registerSchema } from '../validation/validate.js';
import axios from 'axios';
import {toast } from 'react-toastify';
import '../addReview/AddReview.css'
export default function Register() {
  const  initialValues={
    userName :'',
    email :'',
    password :'',
    image :'',
   };
    
   const handelFieldChange = (event)=>{
    formik.setFieldValue('image',event.target.files[0]);
   }


   const onSubmit = async users=> {
     const formData =new FormData();
     formData.append("userName",users.userName);
     formData.append("email",users.email);
     formData.append("password",users.password);
     formData.append("image",users.image);
     const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
     if (data.message=='success'){
      toast.success('account created successsfully, plz verify your email to login ', {
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
    };
     const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:registerSchema,
     });


    const inputs =[
     {
       id : 'userName',
       type : 'text',
       name : 'userName',
       title : 'user Name',
       value : formik.values.userName,
     },
     {
       id :'email',
       type : 'email',
       name : 'email',
       title : 'user email',
       value : formik.values.email,
     },
     {
       id : 'password',
       type : 'password',
       name : 'password',
       title : 'user password',
       value : formik.values.password,
     },
     {
      id : 'image',
      type : 'file',
      name : 'image',
      title : 'user image',
      onChange : handelFieldChange,
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
     <h2>Create Account</h2>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button className='btn w-25 mt-4'  type='submit' disabled={!formik.isValid}> Register </button>
      </form>
     </div>
    </>
  )
}