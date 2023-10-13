import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from './../LoadingScreen/LoadingScreen';





export default function Register() {
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigate()

  async function RegisterNewUser(value){
    setIsLoading(true)
    try {
      const {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value)
      console.log(data, "created");
      setSuccessMsg("Account Created Successfully")
      setTimeout(() => {
      navigation("/login")
      }, 1500);
    } catch (error) {
      console.log(error.response.data.message);
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
    onSubmit: RegisterNewUser,
    validate: function(value){

      setSuccessMsg(null)
      setErrorMsg(null)
      const passwordRegex = /^[A-za-z0-9]{6}/
      const errors = {}
      if(value.name.length < 4 || value.name.length > 14){
        errors.name = "Name is Required"
        if(value.name.length > 1 && value.name.length < 4){
          errors.name = "Name should be between 4 and 12 charecters"
        }
      }
      if(value.email.includes("@") === false || value.email.includes(".") === false){
        errors.email = "Invalid email";
        if(value.email.length > 1){
          errors.email = "email pattern is invalid"
        }
      }
      if(!value.password.match(passwordRegex)){
        errors.password = <>
        <ul>Must:
          <li>Start with a letter (either uppercase or lowercase).</li>
          <li>Be between 6 and 9 characters in total.</li>
          <li>Can only contain letters (A-Z or a-z) and numbers (0-9)</li>
        </ul>
        </>
        if(value.password.length < 2 ){
          errors.password = "Please use a strong password"
        }
      }if(value.rePassword !== value.password){
        errors.rePassword = "The Re-Password Doesn't Match Your Password"
        if(value.rePassword.length > 1){
          errors.repassword = "Re-Password is required"
        }
      }

      return errors;
    },
    
  })

  
  return <>
  {isLoading?<LoadingScreen/> : null}
      <div className='w-75 bg-body-tertiary m-auto p-5 my-5'>
        <h2 className='pb-4'>Register</h2>
        {successMsg? <div className="alert alert-success">{successMsg}</div>:""}
        {errorMsg? <div className="alert alert-danger">{errorMsg}</div>:""}
        <form onSubmit={formikObj.handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input className="form-control mb-3" value={formikObj.values.name} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} placeholder="name" type="text" name="name" id="name" />
        {formikObj.errors.name && formikObj.touched.name? <div className="alert alert-danger">{formikObj.errors.name}</div>:null}

        <label htmlFor="email">Email:</label>
        <input className="form-control mb-3" value={formikObj.values.email} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} placeholder="email" type="text" name="email" id="email" />
        {formikObj.errors.email && formikObj.touched.email ? <div className="alert alert-danger">{formikObj.errors.email}</div>: null}


        <label htmlFor="password">Password:</label>
        <input className="form-control mb-3" value={formikObj.values.password} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} placeholder="password" type="password" name="password" id="password" />
        {formikObj.errors.password && formikObj.touched.password? <div className="alert alert-danger">{formikObj.errors.password}</div>:null}


        <label htmlFor="rePassword">Repassword:</label>
        <input className="form-control mb-3" value={formikObj.values.rePassword} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} placeholder="rePassword" type="password" name="rePassword" id="rePassword" />
        {formikObj.errors.rePassword && formikObj.touched.rePassword? <div className="alert alert-danger">{formikObj.errors.rePassword}</div>:null}


        <label htmlFor="phone">Phone:</label>
        <input className="form-control mb-3" value={formikObj.values.phone} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} placeholder="phone" type="text" name="phone" id="phone" />
        {formikObj.errors.phone && formikObj.touched.phone? <div className="alert alert-danger">{formikObj.errors.phone}</div>:null}

        <button type='submit' disabled={formikObj.dirty === false || !formikObj.isValid} className="btn btn-success">
        {isLoading? <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="1"
          width="30"
          visible={true}
        />: "Register"}
          </button>
        <span className="ms-5 "> Already hav an account? <Link to={"/login"} className='text-success'> Login</Link></span>
        </form>
      </div>

  </>
}
