
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import Register from "./Register";
import Forgetpassword from "./Forgetpassword"
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true)

const toggleChange = () => {
    setEye((prev) => !prev)
}
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/homepage");
    }
  });

  const checklogin = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if (result.success === false) {
      toast.warn("Please verify your email first!");
    } else if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/homepage");
    } else {
      toast.warn("Please enter the valid informations!");
    }
  };

  return (
    <div>
      <main className="flex h-screen justify-center items-center overflow-hidden">
        <div className="container1 w-[100%] h-[80%] flex border-2 border-gray-200 rounded-md shadow-lg tablet:w-[60%] laptop:w-[60%] tablet:justify-center">
          <div className="left hidden desktop:flex desktop:flex-1 laptop:flex laptop:w-[50%]">
            <div className="showcase h-[100vh] flex items-center mx-auto">
              <div className="showcase-content">
                <h1 className="text-[32px] w-[100%] mb-[24px] font-bold text-white">
                  We’ve got it all <br></br>for you.
                </h1>
                <Link
                  to="/register"
                  element={<Register />}
                  className="secondary-btn border-2 border-white font-bold text-white"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
          <div className="right bg-white flex flex-col items-center justify-center w-[100%] laptop:w-[50%] desktop:w-[40%]">
            <div className="login flex flex-col justify-center items-center w-[80%] pb-[16px]">
              <div className="logo mb-[4vh]">
                <h1 className="text-[32px]">Ghumfir</h1>
              </div>
              <form className="w-[100%] pb-[16px]" onSubmit={checklogin}>
                <div>
                  <label
                    htmlFor="Email"
                    className="text-[16px] leading-[32px] font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    value={email}
                    className="text-input"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="Password"
                    className="text-[16px] leading-[32px] font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type={eye ? "password" : "text" }
                    value={password}
                    maxLength='16'
                    className="text-input"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                   {eye ? <AiFillEye className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> : <AiFillEyeInvisible className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> }
                </div>

                <button type="submit" className="primary-btn">
                  Sign In
                </button>
              </form>

              <div className="or flex mb-[18px] items-center w-[100%]">
                <hr className="bar flex-auto h-[1px] border-none bg-black" />
                <span className="px-[14px]">OR</span>
                <hr className="bar flex-auto h-[1px] border-none bg-black" />
              </div>

              <div className="links mb-[16px] text-[14px] text-center block w-[100%] font-semibold">
                <button className="secondary-btn border-2 border-black">
                  Sign in with Gmail
                </button>
              </div>
              <div className="">
                <p className="text-[14px]">
                  <span className="mr-[4px]">Forget password?</span>
                  <Link
                    to="/forgetpassword"
                    element={<Forgetpassword/>}
                    className="font-bold hover:text-primary-color"
                  >
                    Reset Password
                  </Link>
                </p>
              </div>
            </div>

            <footer className="text-[12px] text-center w-[80%] mt-[16px]">
              <p>Copyright &copy; 2022, Ghumfir all rights reserved</p>
            </footer>
          </div>
        </div>
      </main>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Login;
