import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { sendCodeSchema } from '../validation/validate.js';
import axios from 'axios';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function SendCode() {
  const navigate = useNavigate();
  const  initialValues={
    email :'',
   };
    
   const onSubmit = async users=> {
     const {data} = await axios.patch(`https://ecommerce-node4-five.vercel.app//auth/sendcode`,users);
     if (data.message=='success'){
       toast.success('input code', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
       navigate('/forgotPassword');
     }
    };
     const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema:sendCodeSchema,
     });


    const inputs =[
     {
       id :'email',
       type : 'email',
       name : 'email',
       title : 'user email',
       value : formik.values.email,
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
     <div className='container  vh-100 submitbutton text-center mt-5 w-50'>
     <h2>Send Code</h2>
      <form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button className='btn w-25 mt-4 mb-3'  type='submit' disabled={!formik.isValid}> Send</button>
      </form>
     </div>
    </>
  )
}
