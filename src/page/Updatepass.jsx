import React, { useState } from "react";
import { useAuthState } from "../contextapi/AuthState";
import { errorEmitter, successEmitter } from "../../ToastifyEmitter";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../BaseUrl";

function Resetpass({isupdate, setIsupdate}) {

  const [newPass, setNewPass] = useState("")
  const [conformPass, setConformPass] = useState("")
  const { otpvailidation, setLoader, user, setUser } = useAuthState()
  const naviget = useNavigate()

  const updatepass = async (e) => {
    e.preventDefault()
    setLoader(true)
    if (otpvailidation < Date.now()) {
      setIsupdate(false)
      const message = "Otp Expired"
      return errorEmitter(message)
    }

    if (newPass !== conformPass) {
      const message = "Password not match"
      return errorEmitter(message)
    }
    user.password=conformPass
    console.log(user.password)
    try {
      const res = await fetch(`${BASE_URL}/auth/reset/pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      console.log("request sent")
      const data = await res.json()
     if(data.sucess){
      naviget("/")
      setIsupdate(false)
      return successEmitter(data.message)
     }
    } catch (error) {
      console.log(error)
    }
 

  }
  return (
    <form onSubmit={updatepass}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1720]">

        <div className="bg-[#1e1e1e] rounded-[40px] p-8 shadow-2xl w-[320px]">

          <h2 className="text-center text-white text-2xl font-semibold mb-6 tracking-wider">
            RESET PASSWORD
          </h2>

          {/* New Password */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm">New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              onChange={(e) => {setNewPass(e.target.value)}}
              className="w-full mt-2 px-4 py-2 rounded-full 
              bg-transparent border border-yellow-400
              text-white outline-none
              focus:shadow-[0_0_15px_#facc15]"
            />
          </div>
          {/* Conform Password */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm">Conform Password</label>
            <input
              type="password"
              placeholder="Conform Password"
              onChange={(e) => { setConformPass(e.target.value) }}
              className="w-full mt-2 px-4 py-2 rounded-full 
              bg-transparent border border-yellow-400
              text-white outline-none
              focus:shadow-[0_0_15px_#facc15]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full 
            bg-yellow-400 text-black font-semibold
            shadow-lg hover:shadow-yellow-400/50
            transition duration-300"
          >
            Change Password
          </button>

        </div>
      </div>
    </form>
  );
}

export default Resetpass;