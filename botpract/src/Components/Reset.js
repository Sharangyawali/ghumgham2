import React, { useState,useEffect } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import {useLocation,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Reset = () => {

  const navigate=useNavigate()
  const[error,setError]=useState(false)
  const[password,setPassword]=useState("")
  const[confpassword,setConfpassword]=useState("")
  const location=useLocation()
  const [eye, setEye] = useState(true)

  const toggleChange = () => {
      setEye((prev) => !prev)
  }
  let queryparams = new URLSearchParams(location.search);
  let userId = queryparams.get("id");
  let userToken=queryparams.get("token")
  console.log(userId)
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/homepage");
    }
  });
  const verification=async(e)=>{
    e.preventDefault()
    if(password!==confpassword||password.length<=5){
      setError(true)
    }
    else{
      let result=await fetch(`http://localhost:5000/resetpassword?id=${userId}&token=${userToken}`,{
        method:"put",
        body:JSON.stringify({password}),
        headers:{"Content-Type": "application/json" }
      })
      result=await result.json()
      if(result.success===false){
        toast.error("Error in verification of your email")
      }
      else{
          navigate("/")
      }
    }
  }

  return (
    <main className='h-screen overflow-hidden'>
    <div className='w-[400px] min-h-[240px] border-2 mx-auto mt-[180px] p-[16px] rounded-md bg-white laptop:w-[460px]'>
        <h1 className='text-[24px] font-bold text-center mb-[16px]'>Reset Password</h1>
        <form className='flex flex-col gap-6' onSubmit={verification}>
            <div className='relative'>
            <label className='font-semibold'>New Password</label>
            <input  type={eye ? "password" : "text" } placeholder='Enter new password' className='py-[0.5rem] px-[1rem] rounded-sm leading-[1.3rem]' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {eye ? <AiFillEye className='absolute top-[34px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> : <AiFillEyeInvisible className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> }

            {(error&&password.length>=6)?( <p className="text-[10px] italic text-red-600">
                    Password must be same in both fields!
                  </p>):""}
                  {(error&&password.length<=5)?( <p className="text-[10px] italic text-red-600">
                    Password must be of atleast 6 characters
                  </p>):""}
            </div>
            <div className='relative'>
            <label className='font-semibold'>Confirm Password</label>
            <input type={eye ? "password" : "text" } placeholder='Confirm new password' className='py-[0.5rem] px-[1rem] rounded-sm leading-[1.3rem]'value={confpassword} onChange={(e)=>setConfpassword(e.target.value)} />
            {eye ? <AiFillEye className='absolute top-[34px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> : <AiFillEyeInvisible className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> }

            {(error&&confpassword.length>=6)?( <p className="text-[10px] italic text-red-600">
                    Password must be same in both fields!
                  </p>):""}
                  {(error&&confpassword.length<=5)?( <p className="text-[10px] italic text-red-600">
                    Password must be of atleast 6 characters
                  </p>):""}
            </div>
            <button className='primary-btn mt-[12px]'>Confirm</button>
        </form>
    </div>
    <ToastContainer/>
    </main>
  )
}

export default Reset