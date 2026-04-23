
import myPhoto from "../assets/MyPhoto.jpg";

function about() {
    return (
        <>
            <section className="py-20 text-center bg-gradient-to-b from-black to-gray-900">
                <h2 className="text-4xl font-bold mb-10">
                    About <span className="text-orange-500">Me</span>
                </h2>

                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-orange-500 blur-3xl opacity-40"></div>
                        <img
                            src={myPhoto}
                            alt="about"
                            className="relative w-52 h-52 rounded-full border-4 border-orange-500"
                        />
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-orange-500">
                    Full-stack Web Developer
                </h3>

                <p className="max-w-2xl mx-auto text-gray-400 mb-6">
                    I specialize in building scalable frontend architectures using React
                    and Tailwind CSS with clean UI and smooth user experience.
                </p>

                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold">
                    Hire Me
                </button>
            </section>
        </>
    )
}

export default about