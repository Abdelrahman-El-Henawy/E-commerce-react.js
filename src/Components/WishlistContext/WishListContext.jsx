import axios from 'axios'
import React, { createContext, useCallback, useState } from 'react'




export const wishListContext = createContext()



export default function WishListContextProvider({children}) {

    const [wishlist, setWishlist] = useState(null)
    const [loading, setLoading] = useState(false)




    const getWishList = useCallback(async ()=>{

            setLoading(true)
            try {
                const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
                    headers:{
                        token: localStorage.getItem("token")
                    }
                })
                console.log(data);
                setWishlist(data);
            } catch (error) {
                return error
            }
            finally{
                setLoading(false)
            }
    
    },[])



    async function addToWishlist(productId){
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
            {
                "productId": productId
            },
            {
                headers:{
                    token: localStorage.getItem("token")
                }
            })
            console.log(data);
            return data
        } catch (error) {
            return error
        }
    }

    async function removeFromWishlist(id){
    try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token: localStorage.getItem("token")
            }
        })
        getWishList()
    } catch (error) {
        console.log(error);
    }
    }




  return <wishListContext.Provider value={
   { wishlist,
    setWishlist,
    getWishList,
    loading,
    addToWishlist,
    removeFromWishlist,

    }}>
    {children}
  </wishListContext.Provider>
}
