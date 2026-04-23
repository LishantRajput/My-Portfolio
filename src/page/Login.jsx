import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BaseUrl"
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../contextapi/AuthState";
import { errorEmitter, successEmitter } from "../../ToastifyEmitter";
const Login = () => {
  const navigate = useNavigate()
  const { islogin, setIslogin, loader, setLoader } = useAuthState()
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const changeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const loginfun = async (e) => {
    setLoader(true)
    e.preventDefault()

    try {
      console.log("req sent")
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })
      const data = await res.json()
      console.log(data.message)
      if (data.success) {
        localStorage.setItem("token", data.token)
        successEmitter(data.message)
        setIslogin(localStorage.getItem("token"))
        navigate("/")
      } else {
        errorEmitter(data.message)
      }
    } catch (error) {
      errorEmitter("Server Error")
      console.log(error.message)

    } finally {
      setLoader(false)
    }

  }
  return (
    <>
      {!islogin ?<form action="" onSubmit={loginfun}>

        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1720]">

          {/* Card Wrapper */}


          {/* Card */}
          <div className="bg-[#1e1e1e] rounded-[40px] p-8 shadow-2xl">

            <h2 className="text-center text-white text-2xl font-semibold mb-6 tracking-wider">
              LOGIN
            </h2>

            {/* Username */}
            <div className="mb-5">
              <label className="text-gray-300 text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={changeHandler}
                className="w-full mt-2 px-4 py-2 rounded-full 
              bg-transparent border border-yellow-400
              text-white outline-none
              focus:shadow-[0_0_15px_#facc15]"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={changeHandler}
                className="w-full mt-2 px-4 py-2 rounded-full 
              bg-transparent border border-yellow-400
              text-white outline-none
              focus:shadow-[0_0_15px_#facc15]"
              />
            </div>

            {/* Button */}
            {loader ? (<button className="w-full py-2 rounded-full 
          bg-gray-400 text-black font-semibold
          shadow-lg " >
              Sign In<div className="ld ld-spin ld-ring"></div>
            </button>) :
              (<button className="w-full py-2 rounded-full 
          bg-yellow-400 text-black font-semibold
          shadow-lg hover:shadow-yellow-400/50
          transition duration-300" >
                Sign In
              </button>)}

            {/* Forgot */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Forgot Password?{" "}
              <span onClick={() => navigate("/resetpass")} className="text-lime-400 cursor-pointer hover:underline">
                Click Here
              </span>
            </p>

          </div>
        </div>
      </form> : ()=>{navigate("/")}}
    </>

  );
};

export default Login;