import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

function Contact() {
  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6 py-16">
      
      {/* Orange Glow Background */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-orange-500 blur-[150px] opacity-40"></div>

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
        
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

          <div>
            <p className="text-gray-400">Name</p>
            <h3 className="text-lg font-semibold">Lishant Rajput</h3>
          </div>

          <div>
            <p className="text-gray-400">Phone Number</p>
            <h3 className="text-lg font-semibold">+91 9110089184</h3>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <h3 className="text-lg font-semibold">rlishant@email.com</h3>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 text-2xl pt-4">
            <a href="https://github.com/LishantRajput" className="hover:text-orange-500 transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-orange-500 transition">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/lishant-rajput-b628a23a1/" className="hover:text-orange-500 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Divider (Desktop Only) */}
        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-[1px] bg-white/20"></div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-orange-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-orange-500"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-orange-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-orange-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition rounded-lg py-3 font-semibold shadow-[0_0_25px_rgba(255,115,0,0.6)]"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
export default Contact