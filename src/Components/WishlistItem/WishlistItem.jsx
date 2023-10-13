import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { wishListContext } from '../WishlistContext/WishListContext'

export default function WishlistItem({prod}) {
  const {removeFromWishlist} = useContext(wishListContext)


  function handleRemove(id){
    removeFromWishlist(id)
  }





  return <>


<div className="col-md-3">
        <div className="bg-white">
      <Link  className="text-decoration-none" to={`/productDetails/${prod.id}`}>
        <img src={prod.imageCover} className='w-100' alt="" />
          <h2 className='text-dark'>
            {prod.title.split(" ").length > 3? `${prod.title.split(" ").slice(0,3).join(" ")}...` : prod.title}
          </h2>
              <p className='text-dark'>{prod.description.split(" ").length > 7? `${prod.description.split(" ").slice(0,7).join(" ")}...` : prod.description}</p>
      </Link>
      <button onClick={()=>{
        handleRemove(prod.id)
      }} className="btn btn-danger px-5 py-2 w-100">remove</button>
        </div>
      </div>
  </>
}
