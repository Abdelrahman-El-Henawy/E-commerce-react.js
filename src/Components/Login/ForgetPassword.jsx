import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
    const [successMsg, setSuccessMsg] = useState(null)
    const [successStatus, setSuccessStatus] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [errorStatus, setErrorStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    async function forgetPassword(value){
        setIsLoading(true)
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",value)
            console.log(data);
            setSuccessStatus(data.statusMsg)
            setSuccessMsg(data.message)
            setTimeout(() => {
                navigate("/resetPassword")
            }, 2000);
        } catch (error) {
          setErrorStatus(error.response.data.statusMsg)
          setErrorMsg(error.response.data.message)
        }finally{
            setIsLoading(false)
        }
      }


      const formikObj = useFormik({
        initialValues:{
            email:""
        },
        onSubmit:forgetPassword,
        validate: function(value){
            setSuccessMsg(null)
            setSuccessStatus(null)
            setErrorMsg(null)
            setErrorStatus(null)
        }
      })
  return <>
    <div className="w-75 bg-body-tertiary minHeight1 m-auto p-5 my-5">
        <h2>Forget Password</h2>
        <form onSubmit={formikObj.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input className="form-control mb-3" required onChange={formikObj.handleChange} onInput={(e)=>{
                localStorage.setItem("email",e.target.value)
            }} value={formikObj.values.email} placeholder="please enter your email" type="email" name="email" id="email" />
        <button  type='submit' className="btn btn-success">confirm</button>
        </form>
    {successStatus? <h3>{successMsg}</h3>:""}
    {errorStatus? <h3>{errorMsg}</h3>:""}
    </div>
  </>
}