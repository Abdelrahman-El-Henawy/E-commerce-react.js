import React, { useContext, useState } from 'react'
import { useFormik } from "formik";
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { dataContexted } from '../ContextedData/ContextedData';

export default function Register() {

  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { setToken } = useContext(dataContexted)


  async function Login(value){
    setIsLoading(true)
    try {
      const {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",value)

      setSuccessMsg("Welcome Back")

      localStorage.setItem("token", data.token)
      setToken(data.token)

      setTimeout(() => {
        navigate("/home")
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response.data.message)
    }
    setIsLoading(false)
  }
  const formikObj = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    onSubmit: Login,
    validate: function(value){
      setSuccessMsg(null)
      setErrorMsg(null)
      const passwordRegex = /^[A-za-z0-9]{6}/
      const errors = {}
      if(value.email.includes("@") === false || value.email.includes(".") === false){
        errors.email = "Invalid email";
        if(value.email.length > 1){
          errors.email = "email pattern is invalid"
        }
      }
      if(!value.password.match(passwordRegex)){
        errors.password = "Password pattern is invalid"
        if(value.password.length < 2 ){
          errors.password = "Please use a strong password"
        }
      }
      return errors;
    },
    
  })

  
  return <>
  {isLoading?<LoadingScreen/> : null}
      <div className='w-75 bg-body-tertiary m-auto p-5 my-5'>
        <h2 className='pb-4'>Login</h2>
        {successMsg? <div className="alert alert-success">{successMsg}</div>:""}
        {errorMsg? <div className="alert alert-danger">{errorMsg}</div>:""}
        <form onSubmit={formikObj.handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input className="form-control mb-3" value={formikObj.values.email} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} placeholder="email" type="text" name="email" id="email" />
        {formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-danger">{formikObj.errors.email}</div>: null}


        <label htmlFor="password">Password:</label>
        <input className="form-control mb-3" value={formikObj.values.password} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} placeholder="password" type="password" name="password" id="password" />
        {formikObj.errors.password && formikObj.touched.password? <div className="alert alert-danger">{formikObj.errors.password}</div>:null}

        <button type='submit' disabled={formikObj.dirty === false || !formikObj.isValid} className="btn btn-success">
        {isLoading? <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="1"
          width="30"
          visible={true}
        />: "login"}
          </button>
          <span className="ms-5 "> Already hav an account? <Link to={"/register"} className='text-success'> Register</Link></span>
          <span className="ms-5 "> <Link to={"/forgetPassword"} className='text-success'>  Forget password</Link></span>
        </form>
      </div>

  </>
}


