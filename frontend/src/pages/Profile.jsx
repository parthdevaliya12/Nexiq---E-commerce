import { serverURL } from "@/serverURL";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import profile from "/profile.png";
// import { toast } from "sonner";
// import axios from "axios";
// import { setUser } from "@/redux/userSlice";

// const Profile = () => {
//   const params = useParams();
//   const { user } = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const userId = params.userId || user?._id;
//   const [updateUser, setUpdateUser] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     phoneNo: "",
//     address: "",
//     city: "",
//     zipcode: "",
//     profilePic: "",
//     role: "",
//   });

//   // populate when user data is available
//   useEffect(() => {
//     if (user) {
//       setUpdateUser({
//         firstname: user.firstname || "",
//         lastname: user.lastname || "",
//         email: user.email || "",
//         phoneNo: user.phoneNo || "",
//         address: user.address || "",
//         city: user.city || "",
//         zipcode: user.zipcode || "",
//         profilePic: user.profilePic || "",
//         role: user.role || "",
//       });
//     }
//   }, [user]);

//   const [file, setFile] = useState(null);
//   const handleChange = async (e) => {
//     setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
//   };

//   const handleFileChnage = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setUpdateUser({
//       ...updateUser,
//       profilePic: URL.createObjectURL(selectedFile),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const formData = new FormData();

//       formData.append("firstname", updateUser.firstname);
//       formData.append("lastname", updateUser.lastname);
//       formData.append("email", updateUser.email);
//       formData.append("phoneNo", updateUser.phoneNo);
//       formData.append("address", updateUser.address);
//       formData.append("city", updateUser.city);
//       formData.append("zipcode", updateUser.zipcode);

//       if (file) {
//         formData.append("file", file);
//       }

//       const res = await axios.put(
//         `${serverURL}/api/user/update/${userId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         dispatch(setUser(res.data.data));
//         setUpdateUser(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//       const msg =
//         error?.response?.data?.message ||
//         error?.message ||
//         "Failed to update profile";
//       toast.error(msg);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-100 pt-20 px-4 pb-10">
//       <div className="max-w-5xl mx-auto">
//         <Tabs defaultValue="profile" className="w-full">
//           {/* Tabs Header */}
//           <TabsList className="mb-6">
//             <TabsTrigger value="profile">Profile</TabsTrigger>
//             <TabsTrigger value="orders">Orders</TabsTrigger>
//           </TabsList>

//           {/* Profile Tab */}
//           <TabsContent value="profile">
//             <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//               <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//                 My Profile
//               </h1>

//               {/* Profile Image Section */}
//               <div className="flex flex-col items-center mb-10">
//                 <img
//                   src={updateUser?.profilePic || profile}
//                   alt="Profile"
//                   className="w-36 h-36 rounded-full object-cover border-4 border-red-500 shadow-md"
//                 />

//                 <div className="mt-5 w-full max-w-sm">
//                   <Label htmlFor="profileImage" className="mb-2 block">
//                     Change Profile Picture
//                   </Label>
//                   <input
//                     id="profileImage"
//                     type="file"
//                     onChange={handleFileChnage}
//                     accept="image/*"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   {/* First Name */}
//                   <div>
//                     <Label htmlFor="firstname" className="mb-2 block">
//                       First Name
//                     </Label>
//                     <input
//                       id="firstname"
//                       type="text"
//                       name="firstname"
//                       value={updateUser.firstname}
//                       onChange={handleChange}
//                       placeholder="Enter first name"
//                       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                   </div>

//                   {/* Last Name */}
//                   <div>
//                     <Label htmlFor="lastname" className="mb-2 block">
//                       Last Name
//                     </Label>
//                     <input
//                       id="lastname"
//                       type="text"
//                       name="lastname"
//                       value={updateUser.lastname}
//                       onChange={handleChange}
//                       placeholder="Enter last name"
//                       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <Label htmlFor="email" className="mb-2 block">
//                       Email
//                     </Label>
//                     <input
//                       id="email"
//                       type="email"
//                       name="email"
//                       value={updateUser.email}
//                       onChange={handleChange}
//                       placeholder="Enter email"
//                       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                   </div>

//                   {/* Phone Number */}
//                   <div>
//                     <Label htmlFor="phone" className="mb-2 block">
//                       Phone Number
//                     </Label>
//                     <input
//                       id="phone"
//                       type="tel"
//                       name="phoneNo"
//                       value={updateUser.phoneNo}
//                       onChange={handleChange}
//                       placeholder="Enter phone number"
//                       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                   </div>

//                   {/* Address */}
//                   <div className="md:col-span-2">
//                     <Label htmlFor="address" className="mb-2 block">
//                       Address
//                     </Label>
//                     <input
//                       id="address"
//                       type="text"
//                       name="address"
//                       value={updateUser.address}
//                       onChange={handleChange}
//                       placeholder="Enter address"
//                       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                   </div>

//                   {/* City */}
//                   <div>
//                     <Label htmlFor="city" className="mb-2 block">
//                       City
//                     </Label>
//                     <input
//                       id="city"
//                       type="text"
//                       name="city"
//                       value={updateUser.city}
//                       onChange={handleChange}
//                       placeholder="Enter city"
//                       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                   </div>

//                   {/* Zip Code */}
//                   <div>
//                     <Label htmlFor="zipcode" className="mb-2 block">
//                       Zip Code
//                     </Label>
//                     <input
//                       id="zipcode"
//                       type="text"
//                       name="zipcode"
//                       value={updateUser.zipcode}
//                       onChange={handleChange}
//                       placeholder="Enter zip code"
//                       className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <Button
//                   type="submit"
//                   className="w-full mt-8 cursor-pointer bg-red-500 hover:bg-red-400 text-white py-6 text-base"
//                 >
//                   Update Profile
//                 </Button>
//               </form>
//             </div>
//           </TabsContent>

//           {/* Orders Tab */}
//           <TabsContent value="orders">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                 My Orders
//               </h1>

//               <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl">
//                 <p className="text-gray-500 text-lg">No orders found.</p>
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "/profile.png";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";

const Profile = () => {
  const params = useParams();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const userId = params.userId || user?._id;

  const [updateUser, setUpdateUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    zipcode: "",
    profilePic: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setUpdateUser({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        address: user.address || "",
        city: user.city || "",
        zipcode: user.zipcode || "",
        profilePic: user.profilePic || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get(`${serverURL}/api/order/user-orders`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  const [file, setFile] = useState(null);

  const handleChange = async (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChnage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();

      formData.append("firstname", updateUser.firstname);
      formData.append("lastname", updateUser.lastname);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipcode", updateUser.zipcode);

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `${serverURL}/api/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.data));
        setUpdateUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 px-4 pb-12 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50/60 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="profile" className="w-full">
          {/* Tabs */}
          <TabsList
            className="
            mb-8
            bg-white/60 backdrop-blur-xl
            p-2
            rounded-2xl
            shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            border border-white
            h-auto
          "
          >
            <TabsTrigger value="profile" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-sm transition-all font-semibold text-gray-600">
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-sm transition-all font-semibold text-gray-600">
              Orders
            </TabsTrigger>
          </TabsList>

          {/* PROFILE */}
          <TabsContent value="profile">
            <div
              className="
              bg-white/70 backdrop-blur-xl
              rounded-[2.5rem]
              shadow-[0_20px_60px_rgba(0,0,0,0.05)]
              border border-white
              p-6 md:p-10
              animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out
            "
            >
              <div className="grid lg:grid-cols-3 gap-10">
                {/* LEFT PROFILE CARD */}
                <div
                  className="
                  lg:col-span-1
                  bg-gradient-to-b from-white to-red-50/30
                  rounded-[2rem]
                  p-8
                  flex flex-col items-center
                  shadow-sm border border-white
                  relative overflow-hidden
                "
                >
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-100/50 rounded-full blur-2xl"></div>
                  
                  <div className="relative group cursor-pointer mt-4">
                    <img
                      src={updateUser?.profilePic || profile}
                      alt="Profile"
                      className="
                      w-40 h-40
                      rounded-full
                      object-cover
                      border-[6px] border-white
                      shadow-[0_10px_30px_rgba(239,68,68,0.2)]
                      group-hover:scale-105 group-hover:shadow-[0_15px_40px_rgba(239,68,68,0.3)]
                      transition-all duration-500
                    "
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Update</span>
                    </div>
                  </div>

                  <h2 className="mt-6 text-2xl font-black text-gray-900 tracking-tight text-center">
                    {updateUser.firstname} {updateUser.lastname}
                  </h2>

                  <p className="text-red-500 font-medium text-sm mt-1 mb-8">
                    {updateUser.email}
                  </p>

                  <div className="w-full">
                    <Label htmlFor="profileImage" className="mb-2 block text-sm font-medium text-gray-600">
                      Change Avatar
                    </Label>

                    <input
                      id="profileImage"
                      type="file"
                      onChange={handleFileChnage}
                      accept="image/*"
                      className="
                      w-full bg-white border border-gray-100
                      rounded-xl p-3 text-sm text-gray-600
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-xs file:font-semibold
                      file:bg-red-50 file:text-red-500
                      hover:file:bg-red-100
                      focus:ring-2 focus:ring-red-500/30 outline-none
                      transition-all
                    "
                    />
                  </div>
                </div>

                {/* RIGHT FORM */}
                <div className="lg:col-span-2">
                  <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
                    Personal Information
                  </h1>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">First Name</Label>
                        <input
                          name="firstname"
                          value={updateUser.firstname}
                          onChange={handleChange}
                          className="
                          w-full bg-white/80 border border-gray-100 rounded-2xl p-4
                          focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none
                          shadow-sm transition-all
                        "
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Last Name</Label>
                        <input
                          name="lastname"
                          value={updateUser.lastname}
                          onChange={handleChange}
                          className="
                          w-full bg-white/80 border border-gray-100 rounded-2xl p-4
                          focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none
                          shadow-sm transition-all
                        "
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                        <input
                          name="email"
                          value={updateUser.email}
                          onChange={handleChange}
                          className="
                          w-full bg-white/80 border border-gray-100 rounded-2xl p-4
                          focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none
                          shadow-sm transition-all
                        "
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Phone Number</Label>
                        <input
                          name="phoneNo"
                          value={updateUser.phoneNo}
                          onChange={handleChange}
                          className="
                          w-full bg-white/80 border border-gray-100 rounded-2xl p-4
                          focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none
                          shadow-sm transition-all
                        "
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Street Address</Label>
                        <input
                          name="address"
                          value={updateUser.address}
                          onChange={handleChange}
                          className="
                          w-full bg-white/80 border border-gray-100 rounded-2xl p-4
                          focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none
                          shadow-sm transition-all
                        "
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">City</Label>
                        <input
                          name="city"
                          value={updateUser.city}
                          onChange={handleChange}
                          className="
                          w-full bg-white/80 border border-gray-100 rounded-2xl p-4
                          focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none
                          shadow-sm transition-all
                        "
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Zip Code</Label>
                        <input
                          name="zipcode"
                          value={updateUser.zipcode}
                          onChange={handleChange}
                          className="
                          w-full bg-white/80 border border-gray-100 rounded-2xl p-4
                          focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none
                          shadow-sm transition-all
                        "
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="
                      w-full mt-10 h-14
                      bg-red-500 hover:bg-red-600
                      text-white font-bold text-lg
                      rounded-2xl
                      shadow-[0_10px_25px_rgba(239,68,68,0.4)]
                      hover:shadow-[0_15px_30px_rgba(239,68,68,0.5)]
                      hover:-translate-y-1 transition-all duration-300
                    "
                    >
                      Save Changes
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ORDERS */}
          <TabsContent value="orders">
            <div
              className="
              bg-white/70 backdrop-blur-xl
              rounded-[2.5rem]
              shadow-[0_20px_60px_rgba(0,0,0,0.05)]
              border border-white
              p-6 md:p-10
              animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out
            "
            >
              <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
                Order History
              </h1>

              {loadingOrders ? (
                <div className="flex items-center justify-center h-52">
                  <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : orders.length === 0 ? (
                <div
                  className="
                  h-64
                  flex flex-col items-center justify-center
                  rounded-3xl
                  border-2 border-dashed border-gray-200
                  bg-white/50
                "
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No orders found.</p>
                  <p className="text-gray-400 text-sm mt-1">When you buy something, it will appear here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order #{order._id.slice(-8)}</p>
                          <p className="font-black text-2xl text-gray-900">₹{order.amount}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`px-4 py-2 rounded-xl text-sm font-bold tracking-wide ${
                            order.status === 'Paid' ? 'bg-green-50 text-green-600 border border-green-100' :
                            order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                            'bg-gray-50 text-gray-600 border border-gray-100'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                            {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-50">
                        <h4 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Items ({order.products?.length})
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {order.products?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <img src={item.productId?.productImg?.[0]?.url} alt={item.productId?.productName} className="w-14 h-14 object-cover rounded-lg border border-gray-50" />
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.productId?.productName}</p>
                                <p className="text-xs font-medium text-red-500 mt-1">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
