import { FaGithub, FaLinkedin, FaCode, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

const DeveloperInfo = () => {
  const github = () => {
    window.open("https://github.com/parthdevaliya12");
  };
  const linkedin = () => {
    window.open("https://linkedin.com/in/parthdevaliya12");
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden text-white">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-8 sm:p-12 md:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT SIDE - VISUAL */}
            <div className="flex justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-red-400 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3rem] bg-gray-800/80 border border-gray-700 shadow-2xl flex flex-col items-center justify-center gap-6 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                
                <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 -mt-6">
                  <FaLaptopCode className="text-white text-4xl" />
                </div>
                
                <div className="text-center z-10">
                  <p className="font-mono text-gray-400 text-sm mb-1">&lt;developer&gt;</p>
                  <p className="text-2xl font-black tracking-wider text-white">PARTH</p>
                  <p className="font-mono text-red-400 text-sm mt-1">&lt;/developer&gt;</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - TEXT */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 font-bold text-xs tracking-widest uppercase mb-6 border border-red-500/20">
                <FaCode className="w-3 h-3" />
                Behind The Code
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                Built by <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Parth Devaliya</span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                A passionate Full-Stack Developer dedicated to crafting pixel-perfect, scalable, and highly performant web applications. Nexiq is a testament to clean architecture and modern UX design.
              </p>

              <div className="flex gap-4 justify-center lg:justify-start">
                <button
                  onClick={github}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-gray-600 shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <FaGithub size={24} className="group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={linkedin}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0a66c2] text-white shadow-[0_10px_20px_rgba(10,102,194,0.3)] hover:shadow-[0_15px_30px_rgba(10,102,194,0.4)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <FaLinkedin size={24} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DeveloperInfo;
