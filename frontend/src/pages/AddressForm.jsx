import { serverURL } from "@/serverURL";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addAddress,
  deleteAddress,
  setSelectedAddress,
} from "@/redux/productSlice";
import { Plus, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product,
  );

  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );
  
  // Fake UPI Modal state
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal = cart.totalPrice || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + (subtotal > 0 ? shipping : 0) + tax;

  const handleCheckoutClick = () => {
    if (selectedAddress === null) {
      toast.error("Please select an address first.");
      return;
    }
    setShowUpiModal(true);
  };

  const handleFakeUpiPayment = async () => {
    if (!upiId) {
      toast.error("Please enter a valid UPI ID");
      return;
    }
    setIsProcessing(true);
    
    // Simulate network delay for realistic feel
    setTimeout(async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const orderData = {
          products: cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity
          })),
          amount: total,
          tax,
          shipping,
          currency: "INR",
          address: addresses[selectedAddress]
        };

        const res = await axios.post(`${serverURL}/api/order/fake-upi`, orderData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (res.data.success) {
          toast.success("Payment Successful! Order Placed.");
          const userObj = JSON.parse(localStorage.getItem("user") || "{}");
          // Assuming we redirect to profile orders tab
          navigate(`/profile/${userObj._id}`);
          // Note: Cart clearing is handled in backend and next fetch will be empty, 
          // or we could reload/refresh redux here. The backend does it in DB.
        }
      } catch (error) {
        console.error(error);
        toast.error("Payment failed. Please try again.");
      } finally {
        setIsProcessing(false);
        setShowUpiModal(false);
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 relative overflow-hidden min-h-screen">
      {/* Background Decorative Blur */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-50/60 rounded-full blur-[80px] pointer-events-none -z-10"></div>

      {/* FAKE UPI MODAL */}
      {showUpiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-white/90 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md mx-4 transform transition-all border border-white">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl font-black text-red-500">₹</span>
            </div>
            
            <h2 className="text-3xl font-black text-gray-900 mb-2">Complete Payment</h2>
            <p className="text-gray-500 mb-8 font-medium">Please enter your UPI ID to securely simulate payment of <span className="font-bold text-gray-900">₹{total}</span></p>
            
            <div className="mb-8">
              <Label className="mb-3 block text-sm font-bold text-gray-700">UPI ID</Label>
              <Input 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                className="w-full rounded-2xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-red-500/50 py-7 text-lg shadow-sm"
              />
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 rounded-2xl py-7 h-14 font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                onClick={() => setShowUpiModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 rounded-2xl py-7 h-14 bg-red-500 hover:bg-red-600 text-white font-bold text-lg shadow-[0_10px_25px_rgba(239,68,68,0.4)] hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)] hover:-translate-y-1 transition-all"
                onClick={handleFakeUpiPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ₹${total}`
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10 animate-in slide-in-from-left-8 fade-in duration-700 ease-out">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Checkout</h1>
        <p className="text-gray-500 font-medium mt-2">Complete your order securely</p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-8 lg:gap-12
        items-start
      "
      >
        {/* LEFT SIDE */}
        <div
          className="
          lg:col-span-2
          bg-white/70 backdrop-blur-xl
          rounded-[2.5rem]
          shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          border border-white
          p-8 md:p-10
          animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out
        "
        >
          {showForm ? (
            <>
              <h2 className="text-2xl font-black text-gray-900 mb-8">Add Shipping Address</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname" className="text-sm font-semibold text-gray-700">Full Name</Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      placeholder="John Doe"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+91 9498716454"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Example Street, Area"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City Name"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700">State</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="State Name"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipcode" className="text-sm font-semibold text-gray-700">Zip Code</Label>
                    <Input
                      id="zipcode"
                      name="zipcode"
                      placeholder="123456"
                      value={formData.zipcode}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-semibold text-gray-700">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="India"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="rounded-2xl bg-white/80 border-gray-100 py-6 px-4 shadow-sm focus:ring-2 focus:ring-red-500/50"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {addresses?.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1 h-14 rounded-2xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={handleSave}
                    className="
                    flex-1 h-14 rounded-2xl
                    bg-red-500 hover:bg-red-600
                    text-white font-bold text-lg
                    shadow-[0_10px_25px_rgba(239,68,68,0.4)]
                    hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)]
                    hover:-translate-y-1 transition-all duration-300
                  "
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-gray-900">Select Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses?.map((addr, index) => {
                  return (
                    <div
                      onClick={() => dispatch(setSelectedAddress(index))}
                      key={index}
                      className={`
                      p-6 rounded-[2rem] cursor-pointer relative transition-all duration-300 group
                      ${
                        selectedAddress === index
                          ? "bg-red-50/50 border-2 border-red-500 shadow-[0_10px_30px_rgba(239,68,68,0.15)]"
                          : "bg-white/80 border-2 border-transparent shadow-sm hover:shadow-md hover:border-red-200"
                      }
                    `}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedAddress === index ? 'border-red-500 bg-red-500' : 'border-gray-300 bg-white group-hover:border-red-300'}`}>
                            {selectedAddress === index && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <p className="font-bold text-lg text-gray-900">{addr.fullname}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteAddress(index));
                            if (selectedAddress === index) dispatch(setSelectedAddress(null));
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2 rounded-full hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="space-y-1 ml-9">
                        <p className="text-gray-600 font-medium">{addr.phone}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mt-2">
                          {addr.address}, {addr.city}, {addr.state}, {addr.zipcode},{" "}
                          {addr.country}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div 
                  onClick={() => setShowForm(true)}
                  className="p-6 rounded-[2rem] cursor-pointer relative transition-all duration-300 border-2 border-dashed border-gray-300 hover:border-red-400 hover:bg-red-50/30 flex flex-col items-center justify-center min-h-[200px] text-gray-500 hover:text-red-500 group"
                >
                  <div className="w-12 h-12 bg-gray-100 group-hover:bg-red-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Add New Address</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <Button
                  className="
                  w-full h-14 rounded-2xl
                  bg-red-500 hover:bg-red-600
                  text-white font-bold text-lg
                  shadow-[0_10px_25px_rgba(239,68,68,0.4)]
                  hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)]
                  hover:-translate-y-1 transition-all duration-300
                "
                  disabled={selectedAddress === null}
                  onClick={handleCheckoutClick}
                >
                  Proceed to Payment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE ORDER */}
        <div className="w-full lg:col-span-1">
          <div
            className="
            bg-white/80 backdrop-blur-2xl
            rounded-[2.5rem]
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

            <div className="mt-8 space-y-3 text-xs font-medium text-gray-400 bg-gray-50/50 p-5 rounded-2xl border border-gray-50">
              <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-green-400"></span> Free shipping on orders over ₹299</p>
              <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-400"></span> 15-days hassle-free return policy</p>
              <p className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Secure checkout with SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
