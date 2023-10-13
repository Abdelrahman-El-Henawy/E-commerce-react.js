import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState("")
    async function resetPassword(value){
        setIsLoading(true)
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",value)
            console.log(data.status);
            setMsg(data.status)
        } catch (error) {
        console.log(error);
        }
      }
      const formikObj = useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit:resetPassword,
      })
  return <>
    <div className="w-75 bg-body-tertiary minHeight1 m-auto p-5 my-5">
        <h2>Reset Password</h2>
        <form onSubmit={formikObj.handleSubmit}>
            <label htmlFor="code">Enter your code:</label>
            <input className="form-control mb-3" onChange={formikObj.handleChange} name="resetCode" value={formikObj.values.resetCode} type="text" placeholder="please enter your code"/>
        <button  type='submit' className="btn btn-success">confirm</button>
        </form>
        {msg === "Success"? <Navigate to={"/verification"}/>:""}
    {/* {successStatus? <h3>{successMsg}</h3>:""}
    {errorStatus? <h3>{errorMsg}</h3>:""} */}
    </div>
 </>
// }
}
