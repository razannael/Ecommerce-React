import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx'
import style from './Profile.module.css'
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {
    const {userData,loading} = useContext(UserContext);
    if(loading){
      return <p>Loading ...</p>
    }

  return (
    <aside className={`${style.profile}`}>
      <div className={`${style.profileLinks}`}>
        <nav>
          <Link to=''>Information</Link>
          <Link to='contact'>Contact</Link>
          <Link to='order'>My Orders</Link>
        </nav>
      </div>

      <div className={`${style.userData}`}>
          <Outlet/>
      </div>
    </aside>
  );
}
