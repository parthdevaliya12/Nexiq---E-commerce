// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useDispatch, useSelector } from "react-redux";
// import user from "/profile.png";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Trash2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { setCart } from "@/redux/productSlice";
// import { toast } from "sonner";
// import { useEffect } from "react";

// const Cart = () => {
//   const { cart } = useSelector((store) => store.product);
//   const subtotal = cart?.totalPrice;
//   const shipping = subtotal > 299 ? 0 : 10;
//   const tax = subtotal * 0.05; //5%
//   const total = subtotal + shipping + tax;
//   const navigate = useNavigate();
//   const accessToken = localStorage.getItem("accessToken");
//   const dispatch = useDispatch();

//   const handleUpdateQty = async (productId, type) => {
//     try {
//       const res = await axios.put(
//         "http://localhost:8000/api/cart/update",
//         { productId, type },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRemove = async (productId) => {
//     try {
//       const res = await axios.delete("http://localhost:8000/api/cart/remove", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         data: { productId },
//       });
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//         toast.success("Product remove from cart");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadCart = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/cart", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, [dispatch]);
//   return (
//     <div className="pt-20 bg-gray-50 min-h-screen">
//       {cart?.items?.length > 0 ? (
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold text-gray-800 mb-7">
//             Shopping Cart
//           </h1>
//           <div className="max-w-7xl mx-auto flex gap-7">
//             <div className="flex flex-col gap-5 flex-1">
//               {cart?.items?.map((product, index) => {
//                 return (
//                   <Card key={index}>
//                     <div className="flex justify-between items-center px-5">
//                       <div className="flex items-center w-[350px]">
//                         <img
//                           src={product?.productId?.productImg?.[0]?.url || user}
//                           alt=""
//                           className="w-25 h-25"
//                         />
//                         <div className="w-[280px] px-2">
//                           <h1 className="font-semibold truncate">
//                             {product?.productId?.productName}
//                           </h1>
//                           <p className="">
//                             ₹{product?.productId?.productPrice}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex gap-5 items-center">
//                         <Button
//                           onClick={() =>
//                             handleUpdateQty(product?.productId?._id, "decrease")
//                           }
//                           variant="outline"
//                         >
//                           -
//                         </Button>
//                         <span>{product.quantity}</span>
//                         <Button
//                           onClick={() =>
//                             handleUpdateQty(product?.productId?._id, "increase")
//                           }
//                           variant="outline"
//                         >
//                           +
//                         </Button>
//                       </div>
//                       <p>
//                         ₹{product?.productId?.productPrice * product?.quantity}
//                       </p>
//                       <p
//                         onClick={() => handleRemove(product?.productId?._id)}
//                         className="flex text-red-500 items-center gap-1 cursor-pointer"
//                       >
//                         <Trash2 className="w-4 h-4" /> Remove
//                       </p>
//                     </div>
//                   </Card>
//                 );
//               })}
//             </div>
//             <div className="">
//               <Card className="w-[400px]">
//                 <CardHeader>
//                   <CardTitle>Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex justify-between">
//                     <span>Subtotal ({cart?.items?.length} Items)</span>
//                     <span>₹{cart?.totalPrice?.toLocaleString("en-In")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span>₹{shipping}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tax(5%)</span>
//                     <span>₹{tax}</span>
//                   </div>
//                   <hr />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>Total</span>
//                     <span>₹{total}</span>
//                   </div>
//                   <div className="space-y-3 pt-4">
//                     <div className="flex space-x-2">
//                       <Input placeholder="Promo Code" />
//                       <Button variant="outline">Apply</Button>
//                     </div>
//                     <Button
//                       onClick={() => navigate("/address")}
//                       className="w-full bg-red-500 hover:bg-red-400 transition"
//                     >
//                       Place Order
//                     </Button>
//                     <Button variant="outline" className="w-full bg-transparent">
//                       <Link to={"/products"}>Continue Shopping</Link>
//                     </Button>
//                   </div>
//                   <div className="text-sm text-muted-foreground pt-4">
//                     <p>- Free shipping on order over ₹299 </p>
//                     <p>- 15-days return policy </p>
//                     <p>- Secure checkout with SSL encryption </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col justify-center items-center min-h-[60vh] p-6 text-center">
//           {/* icons */}
//           <div className="bg-red-100 p-6 rounded-full">
//             <ShoppingCart className="w-16 h-16 text-red-500" />
//           </div>
//           {/* title */}
//           <h2 className="mt-6 text-2xl font-bold text-gray-800">
//             Your Cart Now Empty
//           </h2>
//           <p>Looks like you haven't added anything to your cart yet</p>
//           <Button
//             onClick={() => navigate("/products")}
//             className="mt-6 bg-red-500 cursor-pointer hover:bg-red-400 transition text-white"
//           >
//             Shop Now
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import user from "/profile.png";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, ArrowRight, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { useEffect } from "react";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);

  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + (subtotal > 0 ? shipping : 0) + tax;

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const handleUpdateQty = async (productId, type) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/cart/update",
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete("http://localhost:8000/api/cart/remove", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadCart = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (
    <div className="pt-24 bg-gradient-to-br from-gray-50 to-white min-h-screen px-4 pb-20 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-50/60 rounded-full blur-[80px] pointer-events-none -z-10"></div>

      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8 animate-in slide-in-from-left-8 fade-in duration-700 ease-out">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <ShoppingCart className="text-red-500 w-5 h-5" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Your Cart <span className="text-gray-400 font-medium text-2xl">({cart?.items?.length})</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT CART ITEMS */}
            <div className="flex flex-col gap-5 flex-1">
              {cart?.items?.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="
                    bg-white/70 backdrop-blur-xl
                    rounded-3xl
                    p-4 md:p-6
                    shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                    border border-white
                    hover:shadow-[0_15px_40px_rgba(239,68,68,0.08)] hover:-translate-y-1 transition-all duration-500
                    animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out
                    flex flex-col md:flex-row md:items-center justify-between gap-6
                  "
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* PRODUCT */}
                    <div className="flex items-center gap-5 flex-1 cursor-pointer group" onClick={() => navigate(`/products/${product?.productId?._id}`)}>
                      <div className="w-24 h-24 rounded-2xl bg-gray-50 overflow-hidden border border-gray-100 relative shadow-sm group-hover:shadow-md transition-all">
                        <img
                          src={product?.productId?.productImg?.[0]?.url || user}
                          alt={product?.productId?.productName}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex-1">
                        <h1 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-red-500 transition-colors">
                          {product?.productId?.productName}
                        </h1>
                        <p className="text-red-500 font-semibold mt-1">
                          ₹{product?.productId?.productPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                      {/* QTY */}
                      <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner">
                        <button
                          onClick={() => handleUpdateQty(product?.productId?._id, "decrease")}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 hover:text-red-500 transition-all"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900">{product.quantity}</span>
                        <button
                          onClick={() => handleUpdateQty(product?.productId?._id, "increase")}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 hover:text-red-500 transition-all"
                        >
                          +
                        </button>
                      </div>

                      {/* PRICE */}
                      <p className="font-black text-xl text-gray-900 min-w-[80px] text-right">
                        ₹{product?.productId?.productPrice * product?.quantity}
                      </p>

                      {/* REMOVE */}
                      <button
                        onClick={() => handleRemove(product?.productId?._id)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 shadow-sm"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT SUMMARY */}
            <div className="w-full lg:w-[400px]">
              <div
                className="
                bg-white/80 backdrop-blur-2xl
                rounded-[2rem]
                p-8
                shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                border border-white
                sticky top-28
                animate-in slide-in-from-right-8 fade-in duration-700 ease-out delay-200
              "
              >
                <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900">₹{cart?.totalPrice?.toLocaleString("en-In")}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Shipping</span>
                    <span className="text-gray-900">{shipping === 0 ? <span className="text-green-500">Free</span> : `₹${shipping}`}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Tax (5%)</span>
                    <span className="text-gray-900">₹{tax}</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-100 mb-6"></div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-black text-red-500">₹{total}</span>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="Promo Code" 
                      className="pl-11 pr-24 h-14 rounded-2xl bg-gray-50 border-gray-200 focus:ring-red-500/30"
                    />
                    <Button 
                      variant="ghost" 
                      className="absolute right-2 top-2 h-10 font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      Apply
                    </Button>
                  </div>

                  <Button
                    onClick={() => navigate("/address")}
                    className="
                      w-full h-14 rounded-2xl
                      bg-red-500 hover:bg-red-600
                      text-white font-bold text-lg
                      shadow-[0_10px_25px_rgba(239,68,68,0.4)]
                      hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)]
                      hover:-translate-y-1 transition-all duration-300
                    "
                  >
                    Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate("/products")}
                    className="
                      w-full h-14 rounded-2xl
                      bg-transparent border-2 border-gray-200 text-gray-700
                      font-bold hover:border-gray-900 hover:bg-gray-50
                      transition-all duration-300
                    "
                  >
                    Continue Shopping
                  </Button>
                </div>

                <div className="mt-8 space-y-3 text-xs font-medium text-gray-400 bg-gray-50 p-4 rounded-2xl">
                  <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Free shipping on orders over ₹299</p>
                  <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> 15-days hassle-free return policy</p>
                  <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Secure checkout with SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[60vh] max-w-lg mx-auto text-center px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="bg-white p-8 rounded-full shadow-2xl relative mb-8 border border-red-50">
              <ShoppingCart className="w-20 h-20 text-red-500" />
            </div>
          </div>

          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet. Explore our top categories and find something you love!
          </p>

          <Button
            onClick={() => navigate("/products")}
            className="
            bg-red-500 hover:bg-red-600
            text-white rounded-full px-10 h-14 text-lg font-bold
            shadow-[0_10px_25px_rgba(239,68,68,0.4)]
            hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)]
            hover:-translate-y-1 active:scale-95 transition-all duration-300
          "
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
