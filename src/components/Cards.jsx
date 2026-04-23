import { FaNewspaper, FaTools, FaLightbulb } from "react-icons/fa";
import Skils from "./Skils";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../contextapi/AuthState";
import { useState } from "react";
import { BASE_URL } from "../BaseUrl";

export default function Features() {
    const navigate = useNavigate()
    const { islogin, setProjects, } = useAuthState()
    const fetchproject = async (projectType) => {

        try {
            const res = await fetch(`${BASE_URL}/find/project`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({projectType})
            })
            const data = await res.json()
            console.log(data)
            if(data.success){
                setProjects(data.result)
                navigate(`/${projectType}/allproject`)
                
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="min-h-screen bg-[#0b0f19] text-white px-6 py-20">
                <div className="max-w-6xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        My <span className="text-orange-500">Skills</span>
                    </h2>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

                    {/* Card 1 */}
                    <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 transition duration-500 shadow-[0_0_60px_rgba(255,115,0,0.4)]">
                        <div className="mb-6 text-orange-400 text-3xl">
                            <FaNewspaper />
                        </div>
                        <h2 className="text-2xl font-semibold mb-3 ">HTML/CSS</h2>
                        <p className="text-gray-400 mb-4">
                            Your shortcut to staying ahead — delivered every morning.
                        </p>
                        <div className="flex justify-between ">
                            <button className="text-orange-400 hover:underline cursor-pointer" onClick={()=>{ fetchproject("Html-Css")}}>
                                View Project →
                            </button>
                            {islogin ? <button onClick={() => navigate("/addhtmlproject")} className="text-orange-400 hover:underline cursor-pointer z-index-1">
                                Add Project →
                            </button> : <div></div>}
                        </div>
                    </div>


                    {/* Card 2 */}
                    <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-x1 border border-white/10 hover:scale-105 transition duration-500 shadow-[0_0_60px_rgba(259,130,246,0.4)]">
                        <div className="mb-6 text-blue-400 text-3xl">
                            <FaTools />
                        </div>
                        <h2 className="text-2xl font-semibold mb-3">Java Scripts</h2>
                        <p className="text-gray-400 mb-4">
                            The most powerful AI apps and platforms — tested and reviewed.
                        </p>
                        <div className="flex justify-between">
                            <button className="text-blue-400 hover:underline cursor-pointer" onClick={()=>{ fetchproject("Java-Script")}}>
                                View Project →
                            </button>
                            {islogin ? <button onClick={() => navigate("/addjsproject")} className="text-blue-400 hover:underline cursor-pointer">
                                Add Project →
                            </button> : <div></div>}
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 transition duration-500 shadow-[0_0_60px_rgba(34,197,94,0.4)]">
                        <div className="mb-6 text-green-400 text-3xl">
                            <FaLightbulb />
                        </div>
                        <h2 className="text-2xl font-semibold mb-3">React</h2>
                        <p className="text-gray-400 mb-4">
                            Actionable analysis from researchers and founders shaping AI.
                        </p>
                        <div className="flex justify-between">
                            <button className="text-green-400 hover:underline cursor-pointer" onClick={()=>{ fetchproject("React")}}>
                                View Project →
                            </button>
                            {islogin ? <button onClick={() => navigate("/addreactproject")} className="text-green-400 hover:underline cursor-pointer">
                                Add Project →
                            </button> : <div></div>}
                        </div>
                    </div>

                </div>

                <Skils />

            </section>
        </>
    );
}
