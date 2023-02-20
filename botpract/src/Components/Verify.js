import React from "react";
import { useEffect } from "react";
import "./Verify.css";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Login from "./Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Verify = () => {
  let location = useLocation();
  const navigate=useNavigate()
  let queryparams = new URLSearchParams(location.search);
  let userId = queryparams.get("id");
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/homepage");
    }
  });
  const verification = async () => {
    let result = await fetch(`http://localhost:5000/verify?id=${userId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if(result.success===false){
      toast.error("Error in Email verification")
    }
  };
  useEffect(() => {
    verification();
  });
  return (
    <main>
      <div className="grid grid-cols-2 items-center justify-center h-screen w-[1200px] mx-auto gap-6">
        <div className="col-span-2 mt-[24px] flex flex-col items-center">
          <h1 className="text-[48px] font-extrabold py-[18px]">Thank you!</h1>
          <p className="text-[16px] w-[80%] pb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            quibusdam ullam sapiente omnis dolore cupiditate aspernatur saepe
            ut, quam recusandae similique odit vero dignissimos magni at.
            Officiis, aut adipisci? Doloribus.
          </p>
          <Link
            to="/"
            element={<Login />}
            className="border-2 border-primary-color px-10 py-4 mt-4 text-primary-color text-[18px] goLink rounded-lg font-bold"
          >
            Go to Login Page
          </Link>
        </div>
        <div className="bg-white h-[300px] flex flex-col items-center justify-center gap-6 rounded-lg">
          <div>
            <h1 className="text-[32px] font-bold">Connect with us</h1>
          </div>
          <div className="icons flex gap-4">
            <a className="socials" href="http://Facebook.com">
              <BsFacebook size={40} />
            </a>
            <a className="socials" href="http://instagram.com">
              <BsInstagram size={40} />
            </a>
            <a className="socials" href="http://twitter.com">
              <BsTwitter size={40} />
            </a>
          </div>
        </div>
        <div className="bg-white h-[300px] flex flex-col items-center justify-center gap-6 rounded-lg">
          <h1 className="text-[32px] font-bold">Visit Our Website</h1>
          <a className="bg-primary-color px-[20px] py-[10px] font-bold cursor-pointer hover:bg-secondary-color rounded-lg">
            Visit Website
          </a>
        </div>
      </div>
      <ToastContainer/>
    </main>
  );
};

export default Verify;
