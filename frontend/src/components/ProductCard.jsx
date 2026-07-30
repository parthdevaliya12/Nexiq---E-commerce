import { serverURL } from "@/serverURL";
// import { ShoppingCart } from "lucide-react";
// import { Button } from "./ui/button";
// import { Skeleton } from "./ui/skeleton";
// import axios from "axios";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setCart } from "@/redux/productSlice";

// const ProductCard = ({ product, loading }) => {
//   const accessToken = localStorage.getItem("accessToken");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { productImg, productName, productPrice } = product;
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
//     <div className="shadow-lg rounded-lg overflow-hidden h-max">
//       <div className="w-full h-full aspect-square overflow-hidden">
//         {loading ? (
//           <Skeleton className="w-full h-full rounded-lg" />
//         ) : (
//           <img
//             src={productImg?.[0]?.url}
//             onClick={() => navigate(`/products/${product._id}`)}
//             alt=""
//             className="w-full h-full transition-transform duration-300 hover:scale-105"
//           />
//         )}
//       </div>
//       {loading ? (
//         <div className="px-2 space-y-2 my-2">
//           <Skeleton className="w-[200px] h-4" />
//           <Skeleton className="w-[100px] h-4" />
//           <Skeleton className="w-[150px] h-8" />
//         </div>
//       ) : (
//         <div className="px-2 space-y-1 ">
//           <h1 className="font-semibold h-12 line-clamp-2">{productName}</h1>
//           <h2 className="font-bold">₹{productPrice}</h2>
//           <Button
//             onClick={() => addToCart(product._id)}
//             className="bg-red-500 hover:bg-red-400 w-full mb-3 "
//           >
//             <ShoppingCart />
//             Add to cart
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/productSlice";

const ProductCard = ({ product, loading }) => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productImg, productName, productPrice } = product || {};

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

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-3xl overflow-hidden h-max">
        <div className="w-full aspect-square overflow-hidden p-2">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
        <div className="px-5 py-4 space-y-3">
          <Skeleton className="w-[80%] h-4" />
          <Skeleton className="w-[40%] h-4" />
          <Skeleton className="w-full h-10 mt-4 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      group
      relative
      bg-white
      shadow-sm
      border border-gray-100
      rounded-3xl
      overflow-hidden
      h-max
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all duration-500 ease-out
    "
    >
      <div className="w-full aspect-square overflow-hidden relative bg-gray-50 p-4">
        <img
          src={productImg?.[0]?.url}
          onClick={() => navigate(`/products/${product._id}`)}
          alt={productName}
          className="
            w-full h-full object-contain
            transition-transform duration-700 ease-out
            group-hover:scale-110 cursor-pointer
            mix-blend-multiply
          "
        />
        
        {/* Hover overlay that slides up */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <Button
            onClick={() => addToCart(product._id)}
            className="
            bg-red-500 hover:bg-red-600 hover:scale-[1.02] active:scale-95
            w-full rounded-2xl shadow-lg h-12
            transition-all duration-200
          "
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to cart
          </Button>
        </div>
      </div>

      <div className="px-5 py-5 space-y-1 bg-white">
        <h1 className="font-semibold text-gray-800 line-clamp-2 text-sm md:text-base leading-snug cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => navigate(`/products/${product._id}`)}>
          {productName}
        </h1>

        <div className="flex items-center justify-between mt-2">
          <h2 className="font-black text-xl text-gray-900">₹{productPrice}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
