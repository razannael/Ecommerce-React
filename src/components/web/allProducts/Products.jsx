import React, { useState } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css'
import Stars from '../stars/Stars.jsx';
export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 6;
 const getProducts = async(page ,sort , search) =>{
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${pageSize}&sort=${sort}&search=${search}`);
        if (sort === "highToLow") {
          data.products.sort((a, b) => b.finalPrice - a.finalPrice);
        } else if (sort === "lowToHigh") {
          data.products.sort((a, b) => a.finalPrice - b.finalPrice);
        }

       return data; 
 }

const {data,isLoading}= useQuery(['product', currentPage ,sortingOption,searchTerm], () => getProducts(currentPage ,sortingOption,searchTerm));

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    
  };

    const handleSorting = (sortOption) => {
    setSortingOption(sortOption);
   // setCurrentPage(1); 
  };

    const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="container myContainer ">
      <div className="text-center d-flex gustify-content-center">
        <div className="dropdown text-center mt-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {" "}
            Filter
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSorting("All")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSorting("highToLow")}
              >
                High Price First
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSorting("lowToHigh")}
              >
                Low Price First
              </button>
            </li>
          </ul>
        </div>
        <div className="input-group mb-3 mt-3 ms-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row ms-4 mt-3">
        {data?.total ? (
          data.products.map((product) => (
            <div
              className="col-lg-3 itemAll border text-center m-4"
              key={product._id}
            >
              <Link
                className="text-decoration-none"
                to={`/product/${product._id}`}
              >
                <img src={product.mainImage.secure_url} alt="" />
                <h2 className="mt-3">{product.name}</h2>
                <h3>{product.finalPrice}$</h3>
                <Stars rating={product.ratingNumbers} />
                <button className="mb-3 btn btn-secondary mt-3">
                  Show Product
                </button>
              </Link>
            </div>
          ))
        ) : (
          <h2>No products available</h2>
        )}
      </div>
      <nav aria-label="Page-navigation mt-5 vh-100">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(data.products.length)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === data.products.length ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
