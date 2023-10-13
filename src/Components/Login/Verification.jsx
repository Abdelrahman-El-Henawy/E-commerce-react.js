import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Verification() {
    const navigate = useNavigate()
    async function resetPassword(value){
        // setIsLoading(true)
        try {
            const {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",value)
            console.log(data.token);
            navigate("/login")
        } catch (error) {
        console.log(error);
        }
      }
      const formikObj = useFormik({
        initialValues:{
            
                email: localStorage.getItem("email"),
                newPassword: ""
        },
        onSubmit:resetPassword,
      })
  return <>
 <div className="w-75 bg-body-tertiary minHeight1 m-auto p-5 my-5">
        <h2>Verification</h2>
        <form onSubmit={formikObj.handleSubmit}>
            <label htmlFor="email">Email:</label>
                <input className="form-control mb-3" required onChange={formikObj.handleChange} value={formikObj.values.email} placeholder="please enter your email" type="email" name="email" id="email" />
            <label htmlFor="newPassword">New password:</label>
                <input className="form-control mb-3" required onChange={formikObj.handleChange} value={formikObj.values.newPassword} placeholder="please enter your new password" type="password" name="newPassword" id="newPassword" />
        <button  type='submit' className="btn btn-success">confirm</button>
        </form>

    </div>  </>
}
