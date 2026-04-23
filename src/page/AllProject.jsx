import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { useAuthState } from '../contextapi/AuthState'

function AllProject() {
    const { projects} = useAuthState()
    return (
        <div className="min-h-screen bg-[#0b0f19] text-white px-4 sm:px-6 md:px-10 py-20">

            {/* Heading */}
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400">
                    Projects Showcase 🚀
                </h3>
                <p className="text-gray-400 mt-3 text-sm sm:text-base">
                    Explore all your uploaded projects in one place
                </p>
            </div>

            {/* Project Grid */}
            <div className="max-w-6xl mx-auto">
                {
                    projects && projects.length > 0 ? (

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {projects.map((projects) => (
                                <div
                                    key={projects._id}
                                    className="transform hover:scale-105 transition duration-300"
                                >
                                    <ProjectCard
                                        tittle={projects?.title}
                                        description={projects?.description}
                                        uiTemplate={projects?.uiTemplate}
                                        project_id={projects?._id}
                                        projectType={projects?.projectType}
                                    />
                                </div>
                            ))}

                        </div>

                    ) : (

                        <div className="flex flex-col items-center justify-center mt-20">
                            <p className="text-gray-400 text-lg">
                                😕 No Projects Found
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                Try adding some projects first
                            </p>
                        </div>

                    )
                }
            </div>
        </div>
    )
}

export default AllProject