import React, { useContext, useEffect } from 'react'
import { wishListContext } from '../WishlistContext/WishListContext'
import WishlistItem from '../WishlistItem/WishlistItem'
import LoadingScreen from './../LoadingScreen/LoadingScreen';

export default function WishList() {
  const { wishlist,
    setWishlist,
    getWishList,
    loading} = useContext(wishListContext)
    useEffect(()=>{
      getWishList()
    },[getWishList])
    console.log(wishlist);
    
  return <>
  <div className="container margin minHeight bg-body-tertiary p-3">
  <h2 className='fw-bold py-2 my-5'>My Wishlist</h2>
    <div className="row gy-3">
    {wishlist?.data?.map((product,index)=>{
              return <>
              <WishlistItem prod = {product} key={index}/>
              </>
            })}
    </div>
  </div>

  </>
}
