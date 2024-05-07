import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart.jsx';
import Stars from '../stars/Stars.jsx';
import './Product.css'
import AddReview from '../addReview/AddReview.jsx';

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
      <div className="container text-body-secondary " >
        <div className="row justify-content-center align-items-center p-3">
          <div className="col-lg-12">
            <h2 className="text-center mt-3 mb-1">
              {data.name} <span className="pprice fs-1 ms-3">{data.price}$</span>
            </h2>
            <div
              className="img row pt-3 justify-content-center align-items-center"
            >
              <div className="row justify-content-center pt-2">
                <button
                  className=" addbtn btn btn-outline-secondary w-25 mt-2 mb-4"
                  onClick={() => addToCart(data._id)}
                >
                  Add To Cart
                </button>
              </div>
              {data.subImages.map((img) => (
                <div className="col-lg-3" key={img.public_id}>
                  <img src={img.secure_url} className="img-fluid" />
                </div>
              ))}
              <div className="description w-75 mt-5">
                <h2>Description:</h2>
                <p className="mt-2">{data.description}</p>
              </div>
              <div className=' pt-2'>
              <AddReview productId={productId}/>
              </div>
              <div className="reviews mt-2 w-75 p-4">
                <h2 className='ms-5'>Reviews:</h2>
                {data.reviews.map((review) => (
                  <div className="review text-capitalize d-flex justify-content-between" key={review._id}>
                    <h3 className=''>
                      {review.createdBy.userName} :{" "}
                      <span>{review.comment}</span>
                    </h3>
                    <Stars className='' rating={review.rating} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
