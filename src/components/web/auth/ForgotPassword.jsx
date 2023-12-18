import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { forgotPaswordSchema} from '../validation/validate.js';
import axios from 'axios';
import {toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
export default function ForgotPassword() {
  const navigate = useNavigate();
  const  initialValues={
    email :'',
    password :'',
    code :'',
   };
   const onSubmit = async users=> {
     const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users);
     if (data.message=='success'){
      toast.success('password updated ', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        navigate('/login');
     }
    };
     const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:forgotPaswordSchema,
     });


    const inputs =[
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
        id : 'code',
        type : 'text',
        name : 'code',
        title : 'code',
        value : formik.values.code,
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
     <div className='container vh-100 submitbutton text-center mt-5 w-50'>
     <h2>Update Password</h2>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button className='btn w-25 mt-4 mb-3'  type='submit' disabled={!formik.isValid}> Confirm </button>
      </form>
     </div>
    </>
  )
}
