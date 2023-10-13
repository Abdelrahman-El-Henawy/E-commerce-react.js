import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function HomeCategorySlider() {
    function getAllCategories(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
     }
     const {data,isLoading} = useQuery("allCategeriesSlider",getAllCategories,{
         refetchOnMount:false,
     })
     console.log(data?.data.data);
     const settings = {
         dots: true,
         infinite: true,
         speed: 500,
         slidesToShow: 7,
         slidesToScroll: 1,
         arrows: false,
       };
 
   return <>
       <div>
 
       <h3 className="py-5">category slider</h3>
         {isLoading? <div className=' d-flex justify-content-center align-items-center vh-100'> <i className='fa-solid fa-hourglass'></i> </div>:  
          <Slider {...settings}>
             {data?.data.data.map((photo,index)=>{
                 return <>
                 <div key={index}>
                     <img className="" style={{height:"200px", width: "100%"}} src={photo.image} alt="ay7aga" />
                     <h6>{photo.name}</h6>
                 </div>
                 </>
             })}
 
         </Slider>}
      
       </div>
   </>
 }

