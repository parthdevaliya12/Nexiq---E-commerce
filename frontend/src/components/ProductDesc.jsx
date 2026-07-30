import { serverURL } from "@/serverURL";
// import axios from "axios";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { toast } from "sonner";
// import { setCart } from "@/redux/productSlice";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProductDesc = ({ product }) => {
//   const accessToken = localStorage.getItem("accessToken");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const addToCart = async (productId) => {
//     if (!accessToken) {
//       toast.error("Please login to add products to cart");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${serverURL}/api/cart/addtocart`,
//         { productId },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       if (res.data.success) {
//         toast.success("Product added to cart");
//         dispatch(setCart(res.data.cart));
//         navigate("/cart");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(
//         error?.response?.data?.message || error?.message || "Failed to add product to cart",
//       );
//     }
//   };
//   return (
//     <div className="flex flex-col gap-4">
//       <h1 className="font-bold text-4xl text-gray-800">
//         {product?.productName}
//       </h1>
//       <p className="text-gray-800">
//         {product?.category} | {product?.brand}
//       </p>
//       <h2 className="text-red-500 font-bold text-2xl">
//         ₹{product?.productPrice}
//       </h2>
//       <p className="line-clamp-5 text-muted-foreground">
//         {product?.productDesc}
//       </p>
//       <div className="flex gap-2 items-center w-[300px]">
//         <p className="text-gray-800 font-semibold">Quantity :</p>
//         <Input type="number" className="w-14" defaultValue="1" />
//       </div>
//       <Button
//         onClick={() => addToCart(product._id)}
//         className="bg-red-500 hover:bg-red-400 transition w-max"
//       >
//         Add to cart
//       </Button>
//     </div>
//   );
// };

// export default ProductDesc;
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Shield, Truck, RotateCcw } from "lucide-react";

const ProductDesc = ({ product }) => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    if (!accessToken) {
      toast.error("Please login to add products to cart");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${serverURL}/api/cart/addtocart`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add product to cart",
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 fade-in duration-700 py-4">
      
      {/* Brand & Category Badge */}
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold tracking-wider uppercase border border-red-100">
          {product?.brand}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold tracking-wider uppercase border border-gray-200">
          {product?.category}
        </span>
      </div>

      <h1
        className="
        font-black
        text-3xl sm:text-4xl lg:text-5xl
        text-gray-900
        leading-[1.1]
        tracking-tight
      "
      >
        {product?.productName}
      </h1>

      {/* Ratings Placeholder (Static for visual) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
        </div>
        <span className="text-sm font-semibold text-gray-500 border-l border-gray-300 pl-4">124 Reviews</span>
      </div>

      <div className="flex items-end gap-4 mt-2">
        <h2 className="text-red-500 font-black text-4xl sm:text-5xl tracking-tight">
          ₹{product?.productPrice?.toLocaleString('en-IN')}
        </h2>
        <span className="text-lg text-gray-400 line-through font-medium mb-1">
          ₹{Math.floor(product?.productPrice * 1.2).toLocaleString('en-IN')}
        </span>
        <span className="text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg mb-1">
          20% OFF
        </span>
      </div>

      <div className="h-px w-full bg-gray-100 my-2"></div>

      <p className="text-gray-600 text-lg leading-relaxed font-medium">
        {product?.productDesc}
      </p>

      {/* quantity */}
      <div className="flex flex-col gap-3 mt-4">
        <p className="text-gray-900 font-bold">Quantity</p>
        <div className="flex items-center w-[120px] bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">-</button>
          <input
            type="number"
            className="w-full text-center font-bold text-gray-900 outline-none bg-transparent"
            defaultValue="1"
            min="1"
            readOnly
          />
          <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">+</button>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          onClick={() => addToCart(product._id)}
          className="
          flex-1
          bg-red-500 hover:bg-red-600
          text-white
          h-14 rounded-2xl
          shadow-[0_10px_25px_rgba(239,68,68,0.4)]
          hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)]
          hover:-translate-y-1 transition-all duration-300
          text-lg font-bold
          gap-2
        "
        >
          <ShoppingCart className="w-5 h-5" /> Add to Cart
        </Button>
        <Button
          variant="outline"
          className="
          flex-1
          bg-white hover:bg-gray-50
          text-gray-900
          h-14 rounded-2xl
          border-2 border-gray-200
          hover:border-gray-300
          hover:-translate-y-1 transition-all duration-300
          text-lg font-bold
        "
        >
          Buy Now
        </Button>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-1">
            <Truck className="w-6 h-6" />
          </div>
          <span className="font-bold text-gray-900 text-sm">Free Delivery</span>
          <span className="text-xs text-gray-500">Orders over ₹500</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-1">
            <RotateCcw className="w-6 h-6" />
          </div>
          <span className="font-bold text-gray-900 text-sm">Easy Return</span>
          <span className="text-xs text-gray-500">30 Days Return</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-1">
            <Shield className="w-6 h-6" />
          </div>
          <span className="font-bold text-gray-900 text-sm">1 Year Warranty</span>
          <span className="text-xs text-gray-500">100% Original</span>
        </div>
      </div>

    </div>
  );
};

export default ProductDesc;
