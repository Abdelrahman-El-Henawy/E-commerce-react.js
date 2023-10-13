import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setTotalCartPrice(data.data.totalCartPrice);
      setNumOfCartItems(data.numOfCartItems);
      setAllProducts(data.data.products);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setTotalCartPrice(data.data.totalCartPrice);
      setNumOfCartItems(data.numOfCartItems);
      setAllProducts(data.data.products);
      setCartId(data.data._id)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

    async function removeProduct(id){
    try {
      const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
          token: localStorage.getItem("token")
        }
      });
    setTotalCartPrice(data.data.totalCartPrice);
    setAllProducts(data.data.products);
    setNumOfCartItems(data.numOfCartItems);
      console.log(data);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  async function changeCount(id,count){
    try {
        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {"count": count},{
            headers:{
                token: localStorage.getItem("token")
            }
        }
        )
        setTotalCartPrice(data.data.totalCartPrice);
        setAllProducts(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
  } 

  async function clearCart(){
    try {
        const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token: localStorage.getItem("token")
            }
        })
        setTotalCartPrice(0);
        setAllProducts([]);
        setNumOfCartItems(0);
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addProductToCart: addProductToCart,
        totalCartPrice,
        numOfCartItems,
        allProducts,
        setTotalCartPrice,
        setNumOfCartItems,
        getUserCart,
        setAllProducts,
        removeProduct,
        changeCount,
        clearCart,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
