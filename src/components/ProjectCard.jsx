import React from 'react'
import { FaNewspaper } from 'react-icons/fa'
import { useAuthState } from '../contextapi/AuthState'
import { useNavigate } from 'react-router-dom'

function ProjectCard({ tittle, description, uiTemplate, project_id,projectType }) {
    const { viewpro, setViewPro } = useAuthState()
    const navigate = useNavigate()
    const viewproject = () => {
        setViewPro(project_id)
        console.log(uiTemplate)
       navigate(`/${projectType}/${project_id}/uitemplate`)
    }
    return (
        <div className="group w-full rounded-3xl p-5 sm:p-6 md:p-7 bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 transition duration-300 shadow-[0_0_40px_rgba(255,115,0,0.3)] hover:shadow-[0_0_60px_rgba(255,115,0,0.6)]"
            style={{
                backgroundImage: `url(${uiTemplate})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} onClick={() => viewproject()}>

            {/* Icon */}
            <div className="mb-4 text-orange-400 text-2xl sm:text-3xl">
                <FaNewspaper />
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                {tittle}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base mb-3 line-clamp-3">
                {description}
            </p>

            {/* Project ID / Footer */}
            <p className="text-gray-500 text-xs sm:text-sm break-all">
                ID: {project_id}
            </p>

        </div>
    )
}

export default ProjectCard