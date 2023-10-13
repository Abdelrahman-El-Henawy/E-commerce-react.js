import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const dataContexted = createContext()

export default function ContextedDataProvider({ children }) {

  const [token, setToken] = useState(null)

  useEffect(()=>{
    if(localStorage.getItem("token") !== null){
      setToken(localStorage.getItem("token"))
      console.log("refreshed");
    }
  },[])




  return <>
  <dataContexted.Provider value={
   { token,
    setToken,}
  }>
    {children}
  </dataContexted.Provider>
  </>
}
