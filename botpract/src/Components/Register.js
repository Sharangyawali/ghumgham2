import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState(false);
  const [double, setDouble] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/homepage");
    }
  });
  const rgexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const collectdata = async (e) => {
    e.preventDefault();
    if (
      name.length <= 3 ||
      password.length <= 5 ||
      !rgexp.test(email) ||
      age === ""
    ) {
      setErrors(true);
    } else {
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password, age }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      console.log(result);
      if (result.success === false) {
        setDouble(true);
      } else if (result) {
        toast.info("Please check your email for verification!");
      }
    }
  };
  return (
    <main className="flex h-screen justify-center items-center overflow-hidden">
      <div className="container w-[90%] h-[85%] flex border-2 border-gray-200 rounded-md shadow-lg tablet:w-[60%] laptop:w-[60%] tablet:justify-center">
        <div className="left hidden desktop:flex desktop:flex-1 laptop:flex laptop:w-[50%]">
          <div className="showcase flex flex-col items-center justify-center h-[100vh] mx-auto">
            <div className="showcase-content">
              <h1 className="desktop:text-[28px] w-[100%] mb-[24px] font-bold text-white">
                Already have an acccount?
              </h1>
              <Link
                to="/"
                element={<Login />}
                className="secondary-btn border-2 border-white font-bold text-white desktop:w-[80%] mx-auto"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className="right bg-white flex flex-col items-center justify-center w-[100%] laptop:w-[50%] desktop:w-[40%]">
          <div className="login flex flex-col justify-center items-center w-[80%] pb-[8px]">
            <div className="logo mt-[1vh] mb-[2vh]">
              <h1 className="text-[32px]">Ghumfir</h1>
            </div>
            <form className="w-[100%] pb-[8px]" onSubmit={collectdata}>
              <div>
                <label
                  htmlfor="Name"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                  Username
                </label>
                <input
                  type={"text"}
                  value={name}
                  className="text-input"
                  onChange={(e) => setName(e.target.value)}
                />
                {errors && name.length <= 3 ? (
                  <p className="text-[10px] italic text-red-600">
                    Username must be of atleast 4 characters!
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="Email"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                  Email
                </label>
                <input
                  type={"email"}
                  value={email}
                  className="text-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors && !rgexp.test(email) ? (
                  <p className=" text-red-600 text-[10px] italic">
                    Enter the valid email!
                  </p>
                ) : (
                  ""
                )}
                {double ? (
                  <p className=" text-red-600 text-[10px] italic">
                    Email already exists!
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                  Password
                </label>
                <input
                  type={"password"}
                  value={password}
                  className="text-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors && password.length <= 5 ? (
                  <p className="text-[10px] italic text-red-600">
                    Password must be of atleast 6 characters
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="Age"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                  Age
                </label>
                <input
                  type="number"
                  max={100}
                  value={age}
                  className="text-input"
                  onChange={(e) => setAge(e.target.value)}
                />
                {errors && age === "" ? (
                  <p className="text-[10px] italic text-red-600">
                    Enter your age!
                  </p>
                ) : (
                  ""
                )}
              </div>

              <button className="primary-btn">Sign up</button>
            </form>
            <div className="desktop:hidden">
              <p className="text-[14px]">
                <span className="mr-[4px]">Already have an account?</span>
                <Link
                  to="/"
                  element={<Login />}
                  className="font-bold hover:text-primary-color"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <footer className="text-[12px] text-center w-[80%] mt-[5px]">
            <p>Copyright &copy; 2022, Ghumfir all rights reserved</p>
          </footer>
        </div>
        <ToastContainer position="top-center" theme="colored" />
      </div>
    </main>
  );
};

export default Register;
