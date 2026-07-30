import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    tag: "New Arrivals",
    title1: "Elevate Your",
    title2: "Lifestyle",
    desc: "Discover our carefully curated collection of premium fashion and accessories designed for the modern trendsetter.",
  },
  {
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    tag: "Tech Innovation",
    title1: "Smart Living",
    title2: "Essentials",
    desc: "Experience the future with our cutting-edge gadgets and seamless technology designed to upgrade your daily life.",
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    tag: "Minimalist Design",
    title1: "Simplicity",
    title2: "Redefined",
    desc: "Clean lines, premium materials, and timeless aesthetics. Shop our exclusive minimalist collection today.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Slower transition for a more premium feel

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 min-h-[100vh] flex items-center pt-24 pb-16">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-red-100/60 to-transparent rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-200/50 to-transparent rounded-full blur-[80px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT TEXT CONTENT */}
          <div key={current} className="text-center lg:text-left animate-in slide-in-from-bottom-8 fade-in duration-1000 ease-out fill-mode-both">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-800">{slides[current].tag}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              {slides[current].title1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                {slides[current].title2}
              </span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
              {slides[current].desc}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto group">
                  <ShoppingBag className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Shop Collection
                </Button>
              </Link>

              <Link to="/products">
                <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-full px-8 h-14 text-base font-semibold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto group">
                  Explore Offers
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* SLIDER DOTS */}
            <div className="flex gap-3 mt-12 justify-center lg:justify-start items-center">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-full transition-all duration-500 ${
                    current === index
                      ? "bg-red-500 w-10 h-2.5 shadow-md shadow-red-500/30"
                      : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* STATS STRIP */}
            <div className="grid grid-cols-3 gap-2 sm:gap-8 lg:gap-12 mt-12 justify-center lg:justify-start border-t border-gray-200 pt-8 w-full">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">50K+</h3>
                <p className="text-gray-500 text-[10px] sm:text-sm font-medium mt-1 uppercase tracking-wider">Customers</p>
              </div>
              <div className="text-center lg:text-left border-x border-gray-100 sm:border-none">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">Premium</h3>
                <p className="text-gray-500 text-[10px] sm:text-sm font-medium mt-1 uppercase tracking-wider">Quality</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">24/7</h3>
                <p className="text-gray-500 text-[10px] sm:text-sm font-medium mt-1 uppercase tracking-wider">Support</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative flex justify-center lg:justify-end h-full min-h-[400px] lg:min-h-[600px] animate-in zoom-in-95 fade-in duration-1000 ease-out">
            {/* Outer Decorative Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-100 to-transparent rounded-full blur-2xl transform scale-110 opacity-70"></div>
            
            <div className="relative w-full max-w-[500px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-white group">
              <img
                key={slides[current].image}
                src={slides[current].image}
                alt="hero showcase"
                className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear hover:scale-110 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
