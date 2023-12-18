import React from "react";
import style from "./Profile.module.css";
import { useQuery } from "react-query";
import axios from "axios";
export default function UserOrders() {

  const getOrders = async () => {
    const token = localStorage.getItem("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/order`,
      { headers: { Authorization: `Tariq__${token}` } });
       return data; 
  };

const {data,isLoading}= useQuery('order',getOrders);
  if (isLoading) {
    return <p>Loading ...</p>;
  }
  return(
    <table>
      <thead>
      <tr>
        <th>Order Number</th>
        <th>Your Address</th>
        <th>Your Phone</th>
        <th>Coupon Name</th>
        <th>Created Time</th>
        <th>Final Price</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
       {data.orders.map((order,index)=>
             <tr  key={order._id}>
             <td>{index}</td>
             <td>{order.address}</td>
             <td>{order.phoneNumber}</td>
             <td>{order.couponName}</td>
             <td>{order.createdAt}</td>
             <td>{order.finalPrice}</td>
             <td>{order.status}</td>
           </tr>
       )}
      </tbody>
    </table>
  )
}
