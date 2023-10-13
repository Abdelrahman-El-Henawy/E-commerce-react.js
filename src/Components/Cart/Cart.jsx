import React, { useContext, useEffect } from 'react'
import { cartContext } from '../CartContext/CartContext'
import {ImBin} from "react-icons/im"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Cart() {
  const {totalCartPrice,
    numOfCartItems,
    allProducts,
    getUserCart,
    removeProduct,
    changeCount,
    clearCart
} = useContext( cartContext )

async function incrementCount(id,count){
  const result = await changeCount(id,count)
  if(result.status === "success"){
    toast.success("Added Successfully",
      {
        classNameName:"bg-success text-white"
      }
    )
  }
  console.log(result);
}
async function decrementCount(id,count){
  const result = await changeCount(id,count)
  if(count === 0){
    await removeItem(id)
  }
  if(result.status === "success"){
    toast.error("Removed Successfully")
  }
  console.log(result);
}

async function removeItem(id){
  const result = await removeProduct(id)
  if(result.status === "success"){
    toast.error("Removed Successfully",
    {
      className:"bg-danger text-white"
    })
  } 
  console.log(result);
}

async function deleteItems(){
  await clearCart()
  }

useEffect(()=>{
  getUserCart()
},[])

if(allProducts?.length === 0){
  return <>
  <div className="container margin py-4 bg-body-tertiary">
  <div className="p-4">
            <h2>Cart Shop</h2>
    <h2>No Data Found, <Link className=' text-dark' to={"/products"}>Buy Some Products?</Link> </h2>
          </div>
  </div>
  </>
}
  return <>
<div className="container margin minHeight py-4 bg-body-tertiary">
    <div className="row">
      <div className="col-sm-12 pt-3">
        <div className="cartDetails text-capitalize text-md-center m-md-auto">
          <div className="p-4 d-flex justify-content-between align-items-center">
            <h2>cart shop</h2>
            <Link to={"/payment"}>
            <button className="btn btn-primary px-4 py-2">check out</button>
            </Link>
          </div>
          <div className="p-4 d-flex justify-content-between align-items-center">
            <p className="fw-bold fs-5">total price: <span className="text-success">{totalCartPrice}</span></p>
            <p className="fw-bold fs-5">total number of items: <span className="text-success">{numOfCartItems}</span></p>
          </div>

        </div>
      </div>
    </div>
    <div className="w-50 m-auto d-flex justify-content-center align-items-center">
    <button onClick={()=>{
            deleteItems()
          }} className="btn btn-danger w-50">Clear Items</button>
    </div>
    {allProducts?.map((product,index)=>{
      console.log(product);
      return <>

          <div key={index} className="row align-items-center p-4">
      <div className="col-md-2">
        <img src={product.product.imageCover} className="w-100" alt="" />
      </div>
      <div className="col-md-8">
        <p>{product.product.title}</p>
        <p>{product.price}</p>
        <Link onClick={()=>{
          removeItem(product.product.id)
        }} className=" text-decoration-none text-danger d-flex align-items-center fs-5"><ImBin className="me-1"/> remove</Link>
      </div>
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <button onClick={()=>{
          incrementCount(product.product.id,product.count + 1)
        }} className='btn btn-primary me-1'>+</button> 
         <span className="text-success">{product.count}</span>
        <button onClick={()=>{
          decrementCount(product.product.id,product.count - 1)
        }}  className='btn btn-primary ms-1'>-</button>
      </div>
    </div>
      </>
    })}
  </div>
  
  </>
}
