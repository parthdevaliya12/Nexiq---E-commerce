import { Headphones, Shield, Truck, Sparkles } from "lucide-react";

const Features = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-red-50/50 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gray-50 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs">The Nexiq Difference</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Excellence in Every Detail
          </h2>
          <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just sell products; we deliver an experience. From checkout to delivery, every step is designed for your absolute satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Card 1 */}
          <div className="group bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-red-100 hover:shadow-[0_20px_40px_rgba(239,68,68,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-[100ms]">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-red-50 to-transparent rounded-full transition-transform duration-700 group-hover:scale-[2] ease-out z-0"></div>
            
            <div className="relative z-10">
              <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Lightning Delivery</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Experience ultra-fast, trackable shipping. Free delivery on all premium orders, bringing the world's best products directly to your doorstep.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-red-100 hover:shadow-[0_20px_40px_rgba(239,68,68,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-[200ms]">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-red-50 to-transparent rounded-full transition-transform duration-700 group-hover:scale-[2] ease-out z-0"></div>
            
            <div className="relative z-10">
              <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Ironclad Security</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Shop with total peace of mind. Our military-grade encryption ensures your payment data and personal information are always protected.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-red-100 hover:shadow-[0_20px_40px_rgba(239,68,68,0.08)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-[300ms] md:col-span-2 lg:col-span-1">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-gradient-to-br from-red-50 to-transparent rounded-full transition-transform duration-700 group-hover:scale-[2] ease-out z-0"></div>
            
            <div className="relative z-10">
              <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <Headphones className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Priority Concierge</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Enjoy 24/7 access to our dedicated support team. Whether it's a sizing question or a return request, we're here to help instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
