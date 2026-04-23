import { createContext, useContext, useState } from "react"


export const authstate = createContext(null);
function AuthState({ children }) {

  const [user, setUser] = useState({ email: "", password: "" })
  const [isupdate, setIsupdate] = useState(false)
  const [islogin, setIslogin] = useState(localStorage.getItem("token"))
  const [loader, setLoader] = useState(false)
  const [otp, setOtp] = useState(null)
  const [otpvailidation, setOtpVailidation] = useState(null)
  const [projects, setProjects] = useState([])
  const [viewpro, setViewPro] = useState('')
  return (
    <authstate.Provider value={{
      islogin, setIslogin,
      loader, setLoader,
      otp, setOtp,
      otpvailidation, setOtpVailidation,
      user, setUser,
      isupdate, setIsupdate,
      projects, setProjects,
      viewpro, setViewPro
    }} >
      {children}
    </authstate.Provider>
  )
}

export default AuthState
export const useAuthState = () => useContext(authstate)