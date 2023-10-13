import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function Brands() {
  // const [brand, setBrand] = useState(null)

// async function getAllBrands(){
//   try {
//     const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
//     console.log(data.data);
//     setBrand(data.data)
//   } catch (error) {
//     console.log(error);
//   }
// }
async function getAllBrands(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
}
const {data,isLoading} = useQuery("allBrands", getAllBrands)
console.log(data?.data.data);

  return <>
  {isLoading? <LoadingScreen/>: <>
  <div className="container py-5 margin minHeight">
    <div className="row gy-4">
      {data?.data.data.map((brand,index)=>{

      return <div key={index} className="col-md-3">
        <div className="border border-2 card1">
          <img src={brand.image} className="w-100"  alt="" />
          <h3 className="fw-bold">{brand.name}</h3>
        </div>
      </div>
      })}
    </div>
  </div>
  </>}
  
  </>
}
