import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function AllOrders() {
    const [userOrder, setUserOrder] = useState(null)

    useEffect(() => {
        const token = jwtDecode(localStorage.getItem("token"))
        getUserOrders(token.id)
    }, [])

    async function getUserOrders(userId){
        try {
         const {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)  
         console.log(data);
         setUserOrder(data);
        } catch (error) {
            console.log(error);
        }
    }
    
  return <>
  {userOrder === null? <LoadingScreen/>: <div className="container py-5 margin minHeight">
    <div className="row gy-4">
                {userOrder.map((order,index)=>{
                    return <>
                    <div key={index} className="col-md-6">
                        <div className="order bg-body-tertiary p-2 rounded-4">
                            {order.cartItems?.map((cartItem,idx)=>{
                                return <>
                                <h3>Product Details</h3>
                                <div className="d-flex justify-content-between align-items-center">
                                <p>{cartItem.price} EGP</p>
                                <p>{cartItem.count}</p>
                                <p>{cartItem.product.title}</p>
                                <img src={cartItem.product.imageCover} style={{height:"70px", width:"70px"}} className="" alt="" />
                                </div>
                                </>
                            })}
                            <p>Payment Method: {order.paymentMethodType}</p>
                            <h3>Address</h3>
                            <p>{order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.details}</p>
                            <p>{order.shippingAddress.phone}</p>
                        </div>
                    </div>
                    </>
                })}
    </div>
  </div>}
 
  </>
}
