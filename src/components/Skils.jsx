import React from 'react'

function Skils() {
    return (
        <>
            <section className="py-20 px-10 ">

                <div className="max-w-3xl mx-auto space-y-8">

                    {[
                        { name: "HTML/CSS", level: "90%" },
                        { name: "JAVASCRIPT", level: "85%" },
                        { name: "REACT", level: "85%" },
                    ].map((skill, index) => (
                        <div key={index} >
                            <div className="flex justify-between mb-2">
                                <span>{skill.name}</span>
                                <span>{skill.level}</span>
                            </div>

                            <div className="w-full bg-gray-700 h-3 rounded-full">
                                <div
                                    className="bg-orange-500 h-3 rounded-full"
                                    style={{ width: skill.level }}
                                ></div>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </>
    )
}

export default Skils