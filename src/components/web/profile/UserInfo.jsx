import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/User.jsx';
import style from './Profile.module.css'

export default function UserInfo() {
  const {userData,loading} = useContext(UserContext);
if(loading){
  return <p>Loading ...</p>
}
  return (
    <div className='userinfo'>
         <div className={`${style.userData}`}>
         <h2 className='mt-5 mb-5'>Name : {userData.userName}</h2>
    <img src={userData.image.secure_url}/>
  </div> 
    </div>

  )
}
