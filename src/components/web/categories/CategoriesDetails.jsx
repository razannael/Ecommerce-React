import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Stars from '../stars/Stars.jsx';
import '../allProducts/Products.css'
export default function CategoriesDetails() {
    const {categoryId} = useParams();
    const getCategoryDetails = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }
    const {data,isLoading}= useQuery('category_details',getCategoryDetails);
    if(isLoading){
        return <h2>Loading...</h2>
    }
  return (
    <div className="products  container pt-5">
    <div className='row w-100 ms-2 mt-3'>
      {data.length ? (
        data.map((product) => (
          <div className='col-lg-3 itemAll border text-center m-4' key={product._id}>
            <Link className='text-decoration-none' to={`/product/${product._id}`}>
              <img src={product.mainImage.secure_url} alt="" />
              <h2 className='mt-3'>{product.name}</h2>
              <h3>{product.finalPrice}$</h3>
              <Stars  rating={product.ratingNumbers}/>
              <button className='mb-3 btn btn-secondary mt-3'>Show Product</button>
            </Link>
          </div>
        ))
      ) : (
        <h2>No products available</h2>
      )}
    </div>
    </div>
  );
}
