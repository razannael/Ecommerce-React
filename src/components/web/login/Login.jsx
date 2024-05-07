import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { loginSchema } from '../validation/validate.js';
import axios from 'axios';
import {toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import '../addReview/AddReview.css'
export default function Login() {
  const navigate = useNavigate();
  let {userToken,setUserToken} = useContext(UserContext);
  if(userToken){
    navigate(-1);
  }
  const  initialValues={
    email :'',
    password :'',
   };
    
   const onSubmit = async users=> {
<<<<<<< HEAD
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users);
=======
     const {data} = await axios.post(`https://ecommerce-node4-five.vercel.app//auth/signin`,users);
>>>>>>> main
     if (data.message=='success'){
       localStorage.setItem("userToken",data.token);
      setUserToken(data.token);
       toast.success('login successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
       navigate('/');
     }
    };
     const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:loginSchema,
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
    ];
    const renderInputs = inputs.map((input,index)=>
        <Input type={input.type} 
        id={input.id}
        name={input.name} 
        title={input.title}
        value={input.value} 
        key={index} 
        errors={formik.errors}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        />
    )
  return (
    <>
     <div className='container vh-100 submitbutton text-center mt-5 w-50'>
     <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button className='btn w-25 mt-4 mb-3'  type='submit' disabled={!formik.isValid}> Login</button>
      </form>
      <Link className=' text-decoration-none' to='/sendCode'>Forget Password ?</Link>
     </div>
    </>
  )
}
