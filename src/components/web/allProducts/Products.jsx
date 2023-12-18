import React, { useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css'
import Stars from '../stars/Stars.jsx';
export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
 const getProducts = async(page) =>{
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${pageSize}`);
       return data; 
 }

const {data,isLoading}= useQuery(['order', currentPage], () => getProducts(currentPage));

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
  };

  return (
    <div className='container myContainer vh-100'>
    <div className='row ms-4 mt-3'>
      {data?.products.length ? (
        data.products.map((product) => (
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
    <nav aria-label="Page-navigation mt-5 vh-100">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {[...Array(data.total)].map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === data.total ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
  )
}
