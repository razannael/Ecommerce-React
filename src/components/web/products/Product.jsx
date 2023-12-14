import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart.jsx';

export default function Product() {
    const {productId} = useParams();
    const {addToCartContext} = useContext(CartContext);
    const getProduct = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }

    const {data,isLoading}= useQuery('product',getProduct);
    if(isLoading){
        return <h2>Loading...</h2>
    }

    
    const addToCart = async (productId)=>{
      const res = await addToCartContext(productId);
    }
    return (
      <div className="container text-body-secondary">
        <h1 className="text-center pt-3">Product</h1>
        <div className="row justify-content-center pt-2">
          <button
            className="btn btn-outline-secondary w-25"
            onClick={() => addToCart(data._id)}
          >
            Add To Cart
          </button>
        </div>

        <div className="row justify-content-center align-items-center p-3">
          <div className="col-lg-12">
            <h2 className="text-center">{data.name}</h2>
            <div
              className="img row pt-3 justify-content-center align-items-center"
              key={data._id}
            >
              {data.subImages.map((img) => (
                <div className="col-lg-3">
                  <img src={img.secure_url} className="img-fluid" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
