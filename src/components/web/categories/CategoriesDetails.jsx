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
    <div className="products container pt-5 text-body-secondary vh-100">
      <div className="row w-100 ms-2">
        {data.length ? (
          data.map((product) => (
            <div className="product col-md-3 pb-5 m-4 text-center" key={product._id}>
              <img className="w-100 rounded" src={product.mainImage.secure_url} />
              <h2 className='pt-3 pb-2 text-center fs-6 w-100'>{product.name}</h2>
              <h2>{product.price}$ <div className='ms-2 p-1 w-25 btn btn-outline-secondary' ><Link className='text-decoration-none text-body-secondary' to={`/product/${product._id}`}>details</Link></div></h2>
            </div>
          ))
        ) : (
          <h2>No Products</h2>
        )}
      </div>
    </div>
  );
}
