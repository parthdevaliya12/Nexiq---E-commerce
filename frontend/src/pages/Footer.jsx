import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white pt-24 pb-8">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP NEWSLETTER SECTION */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div>
            <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>
            <p className="text-gray-400 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-800 border border-gray-700 text-white rounded-xl px-5 h-12 w-full sm:w-72 focus:outline-none focus:border-red-500 transition-colors"
            />
            <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 px-8 shadow-lg shadow-red-500/20 font-semibold w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* BRAND */}
          <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-8">
            <h2 className="text-4xl font-black mb-6 tracking-tight text-white">
              Nex<span className="text-red-500">iq</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm mb-8">
              We're dedicated to bringing you the best products at the best prices, delivered with unparalleled customer service and a beautifully seamless shopping experience.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-1 transition-all duration-300 group">
                <FaFacebookF className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-1 transition-all duration-300 group">
                <FaInstagram className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-1 transition-all duration-300 group">
                <FaTwitter className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">Products</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">Careers</a></li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Customer Care</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white hover:text-red-400 transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Get In Touch</h3>
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-500" />
                <span>support@nexiq.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-red-500" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p className="font-medium tracking-wide">
            © {new Date().getFullYear()} Nexiq. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 font-medium tracking-wide">
            Made by <span className="text-red-500 animate-pulse text-lg">♥</span> Parth Devaliya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
