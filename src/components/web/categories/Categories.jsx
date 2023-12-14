import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Categories.css';



export default function Categories() {
const getCategories = async()=>{
  const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`);
  return data;
}
const {data,isLoading} = useQuery('web_categories',getCategories);


if(isLoading){
  return <h2>Loading...</h2>
}

  return (
    <div className='container pt-4'>
      <div className='swiper-custom-pagination'></div>
     <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      loop={true}
      autoplay={{
        delay : 1000
      }}
      pagination={{ 
        clickable: true,
        el: '.swiper-custom-pagination'
      }}
      //onSlideChange={() => console.log('slide change')}
      //onSwiper={(swiper) => console.log(swiper)}
    >
      {data?.categories.length ? data?.categories.map((category)=>
            <SwiperSlide key={category._id}>
              <Link to={`/products/category/${category._id}`}>
              <img src={category.image.secure_url}/>
              </Link>
            </SwiperSlide>
        ):'<h2>no category found</h2>'}
    </Swiper>
    </div>
  )
}
