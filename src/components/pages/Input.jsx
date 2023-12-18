import React from 'react'
export default function Input({type='text' ,id , name ,title,value,onChange,errors,onBlur,touched, step}) {
  return (
    <>
    <div className=' mb-3 ms-2 me-2  text-start'>
      <label className='form-label' htmlFor={id}>{title}</label>
      <input type={type} name={name} step={step} className='form-control ' value={value} id={id} onChange={onChange} onBlur={onBlur} />
      {touched[name]&&errors[name]&&<p className='text text-danger'>{errors[name]}</p>}
      </div>
    </>
  )
}
