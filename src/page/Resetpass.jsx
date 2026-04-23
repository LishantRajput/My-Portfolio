import React, { useState } from "react";
import { BASE_URL } from "../BaseUrl";
import { useAuthState } from "../contextapi/AuthState";
import { useNavigate } from "react-router-dom";
import Updatepass from "./Updatepass"

function Resetpass() {

  const [userOtp, setUserOtp] = useState("")
  const { setLoader, setOtp, otp, otpvailidation, setOtpVailidation, user, setUser } = useAuthState()
  
  const [isupdate, setIsupdate] = useState(false)
  const navigate = useNavigate()
  const changehandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const otpchangehandler = (e) => {
    setUserOtp(e.target.value)
  }

  const otpgenrate = async (e) => {
    e.preventDefault()
    setLoader(true)
    // setIsupdate(true)
    console.log(user)
    try {
      const res = await fetch(`${BASE_URL}/auth/reset/otp-Genarator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      console.log("request sent")
      const data = await res.json()
      console.log(data)
      setOtpVailidation(data.otpExpire)
      setOtp(data.otp)
      console.log(userOtp)
    } catch (error) {
      console.log(error)
    }
  }

  const otpveryfy = (e) => {

    setLoader(true)
    // e.preventDefault()

    if (otpvailidation > Date.now() && otp == userOtp) {
      setIsupdate(true)
    }
    else {
      console.log("otp Expaired")
    }


  }
  return (
    <>
    {isupdate ? <Updatepass isupdate = {isupdate} setIsupdate = {setIsupdate} /> :
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1720]">
        <div className="bg-[#1e1e1e] rounded-[40px] p-8 shadow-2xl w-[320px]">
          <form onSubmit={otpgenrate}>


            <h2 className="text-center text-white text-2xl font-semibold mb-6 tracking-wider">
              RESET PASSWORD
            </h2>

            {/* Email */}
            <div className="mb-5">
              <label className="text-gray-300 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={changehandler}
                placeholder="Enter Email"
                className="w-full mt-2 px-4 py-2 rounded-full 
              bg-transparent border border-yellow-400
              text-white outline-none
              focus:shadow-[0_0_15px_#facc15]"
              />
            </div>
            {/* OTP Sent */}
            <button
              type="submit"
              className="w-full py-2 rounded-full 
            bg-yellow-400 text-black font-semibold
            shadow-lg hover:shadow-yellow-400/50
            transition duration-300"
            >
              Send Otp
            </button>

            {/* Enter OTP */}
            <div className="mb-5">
              <label className="text-gray-300 text-sm">Enter OTP</label>
              <input
                type="text"
                name="otp"
                onChange={otpchangehandler}
                placeholder="Enter OTP"
                className="w-full mt-2 px-4 py-2 rounded-full 
              bg-transparent border border-yellow-400
              text-white outline-none
              focus:shadow-[0_0_15px_#facc15]"
              />
            </div>


          </form>
          {/* Otp Veryfy button */}
          <button
            onClick={() => otpveryfy()}
            className="w-full py-2 rounded-full 
            bg-yellow-400 text-black font-semibold
            shadow-lg hover:shadow-yellow-400/50
            transition duration-300"
          >
            Veryfy Otp
          </button>
        </div>
      </div>}
    </>
  );
}

export default Resetpass;