import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

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
    <div className="products container pt-5 text-body-secondary">
      <div className="row">
        {data.length ? (
          data.map((product) => (
            <div className="product col-md-4 pb-5 text-center" key={product._id}>
              <img className="w-75 rounded" src={product.mainImage.secure_url} />
              <h2 className='pt-3 pb-2 text-center fs-6'>{product.name}</h2>
              <h2>{product.price}$</h2>
              <div className='mt-3 p-1 w-25 btn btn-outline-secondary' ><Link className='text-decoration-none text-body-secondary' to={`/product/${product._id}`}>details</Link></div>
            </div>
          ))
        ) : (
          <h2>No Products</h2>
        )}
      </div>
    </div>
  );
}
