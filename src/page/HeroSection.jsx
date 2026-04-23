
import { useNavigate } from "react-router-dom";
import myPhoto from "../assets/MyPhoto.jpg";
import About from "../components/About"
import Cards from "../components/Cards"
import { useAuthState } from "../contextapi/AuthState";
function HeroSection() {
    const navigate = useNavigate()
    const {islogin} = useAuthState()
    return (
        <>
            <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 pt-32">

                <div className="md:w-1/2 space-y-6">
                    <h4 className="text-gray-400"><span onClick= {()=>{if(!islogin)navigate("/login")}}>H</span>ELLO!</h4>
                    <h1 className="text-3xl md:text-5xl font-bold">
                        I'm <span className="text-orange-500">Lishant Rajput</span> <span className="text-2xl md:text-1xl text-orange-700 ">(Apurva Kumar)</span>
                    </h1>
                    <h2 className="text-2xl text-orange-500 font-semibold">
                        Full-stack Web Developer
                    </h2>
                    <p className="text-gray-400 max-w-md">
                        I build modern, responsive and high performance web applications
                        using React, Node and modern UI frameworks.
                    </p>

                    <button onClick={()=>navigate("/contact")} className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold">
                        Let's Talk
                    </button>
                </div>

                <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-orange-500 blur-3xl opacity-50"></div>
                        <img
                            src={myPhoto}
                            alt="Profile"
                            className="relative w-72 h-72 object-cover rounded-full border-4 border-orange-500"
                        />
                    </div>
                </div>
            </section>
            <Cards />
            <About />

        </>
    )
}

export default HeroSection