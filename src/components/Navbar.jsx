import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '../contextapi/AuthState'
import { successEmitter } from '../../ToastifyEmitter'

function Navbar() {
    const navigate = useNavigate()
    const { islogin, setIslogin } = useAuthState()

    const logoutfun =()=>{
        localStorage.removeItem("token")
        setIslogin(false)
        successEmitter("Loged Out")
    }
    return (
        <>
            <nav className="flex justify-between items-center px-10 py-5 bg-gray-900 fixed w-full z-50">
                <h1 onClick={() => navigate("/")} className="text-2xl font-bold text-orange-500 cursor-pointer">Lishant Rajput</h1>
                <ul className="hidden md:flex gap-8">
                    <li onClick={() => navigate("/")} className="text-orange-500 cursor-pointer">Home</li>
                    <li onClick={() => navigate("/about")} className="hover:text-orange-500 cursor-pointer">About</li>
                    <li onClick={() => navigate("/skills")} className="hover:text-orange-500 cursor-pointer">Skills</li>
                    {!islogin ? <li onClick={() => navigate("/contact")} className="hover:text-orange-500 cursor-pointer">Contact</li> :
                    <li onClick={() => navigate("/skills")} className='px-3 text-[18] text-orange-500 cursor-pointer' >Add Projects</li>}
                </ul>
                {islogin ? <button onClick={logoutfun} className='px-3 font-bold text-orange-500 cursor-pointer' >logout</button> :
                <div></div>}
            </nav>
        </>
    )
}

export default Navbar