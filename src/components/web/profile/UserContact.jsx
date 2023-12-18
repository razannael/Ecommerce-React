import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/User.jsx';
import style from './Profile.module.css'

export default function UserContact() {
  const {userData,loading} = useContext(UserContext);
if(loading){
  return <p>Loading ...</p>
}
  return (
    <div className={`${style.userData}`}>
    <h2 className='mt-5 mb-5'>Gmail : {userData.email}</h2>
    <h2>{userData.phone}</h2>
  </div>
  )
}
