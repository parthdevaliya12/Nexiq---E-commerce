import { serverURL } from "@/serverURL";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/product/get`);
        if (res.data.success) {
          // Take the latest 8 products
          setProducts(res.data.product.slice(0, 8));
        }
      } catch (error) {
        console.log("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/50 rounded-full blur-[100px] pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="animate-in slide-in-from-left-8 fade-in duration-1000">
            <span className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3 block">
              Top Picks
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Featured Products
            </h2>
            <div className="h-1 w-20 bg-red-500 mt-6 rounded-full"></div>
          </div>
          
          <Link to="/products" className="animate-in slide-in-from-right-8 fade-in duration-1000">
            <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all group px-6 h-12">
              View All Collection
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl h-[400px] animate-pulse border border-gray-100 shadow-sm" />
                ))
            : products.map((product) => (
                <div key={product._id} className="animate-in fade-in zoom-in-95 duration-700 ease-out fill-mode-both" style={{ animationDelay: `${Math.random() * 200}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
