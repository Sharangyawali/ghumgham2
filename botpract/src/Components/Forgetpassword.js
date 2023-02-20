import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Forgetpassword = () => {
  const[email,setEmail]=useState("")
  const navigate=useNavigate()
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/homepage");
    }
  });
  const submit=async(e)=>{
    e.preventDefault()
    let result=await fetch("http://localhost:5000/forgetpassword",{
      method:"post",
      body:JSON.stringify({email}),
      headers: { "Content-Type": "application/json" }
    })
    result= await result.json()
   if(result.success===false){
      toast.warn("You do not have account with this email");
    }
    else{
    toast.success("Please check your email for verification")
    }
  }
  return (
    <main className='h-screen overflow-hidden'>
    <div className='max-w-[400px] min-h-[240px] border-2 mx-auto mt-[180px] p-[16px] rounded-md bg-white laptop:w-[460px]'>
        <p className='py-[16px]'>Please enter the email you would like to receive your password reset link</p>
        <form className='flex flex-col gap-4' onSubmit={submit}>
            <div>
            <label className='font-semibold'>Email</label>
            <input type='text' placeholder='Enter email' className='py-[0.5rem] px-[1rem] rounded-sm leading-[1.3rem] mt-[8px]' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <button className='primary-btn mt-[10px]'>Confirm</button>
        </form>
    </div>
    <ToastContainer theme="dark" />
    </main>
  )
}

export default Forgetpassword