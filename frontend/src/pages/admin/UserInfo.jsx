// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import profile from "/profile.png";
// import { Label } from "@/components/ui/label";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";
// import { setUser } from "@/redux/userSlice";
// import axios from "axios";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// const UserInfo = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const [updateUser, setUpdateUser] = useState(null);
//   const dispatch = useDispatch();
//   const userId = params.id;
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
//         `http://localhost:8000/api/user/update/${userId}`,
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

//   const getUserDetails = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/user/getuser/${userId}`,
//       );
//       if (res.data.success) {
//         setUpdateUser(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUserDetails();
//   }, []);

//   return (
//     <div className="pt-5 max-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
//           <div className="flex justify-between gap-10">
//             <Button onClick={() => navigate(-1)}>
//               <ArrowLeft />
//             </Button>
//             <h1 className="font-bold mb-7 text-2xl text-gray-800">
//               Update profile
//             </h1>
//           </div>
//           <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//             <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//               My Profile
//             </h1>

//             {/* Profile Image Section */}
//             <div className="flex flex-col items-center mb-10">
//               <img
//                 src={updateUser?.profilePic || profile}
//                 alt="Profile"
//                 className="w-36 h-36 rounded-full object-cover border-4 border-red-500 shadow-md"
//               />

//               <div className="mt-5 w-full max-w-sm">
//                 <Label htmlFor="profileImage" className="mb-2 block">
//                   Change Profile Picture
//                 </Label>
//                 <input
//                   id="profileImage"
//                   type="file"
//                   onChange={handleFileChnage}
//                   accept="image/*"
//                   className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 />
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* First Name */}
//                 <div>
//                   <Label htmlFor="firstname" className="mb-2 block">
//                     First Name
//                   </Label>
//                   <input
//                     id="firstname"
//                     type="text"
//                     name="firstname"
//                     value={updateUser?.firstname}
//                     onChange={handleChange}
//                     placeholder="Enter first name"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>

//                 {/* Last Name */}
//                 <div>
//                   <Label htmlFor="lastname" className="mb-2 block">
//                     Last Name
//                   </Label>
//                   <input
//                     id="lastname"
//                     type="text"
//                     name="lastname"
//                     value={updateUser?.lastname}
//                     onChange={handleChange}
//                     placeholder="Enter last name"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <Label htmlFor="email" className="mb-2 block">
//                     Email
//                   </Label>
//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={updateUser?.email}
//                     onChange={handleChange}
//                     placeholder="Enter email"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>

//                 {/* Phone Number */}
//                 <div>
//                   <Label htmlFor="phone" className="mb-2 block">
//                     Phone Number
//                   </Label>
//                   <input
//                     id="phone"
//                     type="tel"
//                     name="phoneNo"
//                     value={updateUser?.phoneNo}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>

//                 {/* Address */}
//                 <div className="md:col-span-2">
//                   <Label htmlFor="address" className="mb-2 block">
//                     Address
//                   </Label>
//                   <input
//                     id="address"
//                     type="text"
//                     name="address"
//                     value={updateUser?.address}
//                     onChange={handleChange}
//                     placeholder="Enter address"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>

//                 {/* City */}
//                 <div>
//                   <Label htmlFor="city" className="mb-2 block">
//                     City
//                   </Label>
//                   <input
//                     id="city"
//                     type="text"
//                     name="city"
//                     value={updateUser?.city}
//                     onChange={handleChange}
//                     placeholder="Enter city"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>

//                 {/* Zip Code */}
//                 <div>
//                   <Label htmlFor="zipcode" className="mb-2 block">
//                     Zip Code
//                   </Label>
//                   <input
//                     id="zipcode"
//                     type="text"
//                     name="zipcode"
//                     value={updateUser?.zipcode}
//                     onChange={handleChange}
//                     placeholder="Enter zip code"
//                     className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3 items-center pt-5">
//                 <Label className="block text-sm font-medium">Role</Label>
//                 <RadioGroup
//                   value={updateUser?.role}
//                   onValueChange={(value) =>
//                     setUpdateUser({ ...updateUser, role: value })
//                   }
//                   defaultValue="option-one"
//                   className="flex items-center"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="user" id="user" />
//                     <Label htmlFor="user">User</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="admin" id="admin" />
//                     <Label htmlFor="admin">Admin</Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full mt-8 cursor-pointer bg-red-500 hover:bg-red-400 text-white py-6 text-base"
//               >
//                 Update Profile
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInfo;
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import profile from "/profile.png";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const UserInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [updateUser, setUpdateUser] = useState(null);
  const dispatch = useDispatch();
  const userId = params.id;
  const [file, setFile] = useState(null);

  const handleChange = async (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
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
        `http://localhost:8000/api/user/update/${userId}`,
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

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/user/getuser/${userId}`,
      );

      if (res.data.success) {
        setUpdateUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div
      className="
      px-4 sm:px-6 lg:px-8
      pt-24 pb-10
      min-h-screen
      bg-gray-50
    "
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div
          className="
          flex items-center
          gap-4 mb-8
        "
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="rounded-xl"
          >
            <ArrowLeft />
          </Button>

          <h1 className="font-bold text-2xl text-gray-800">Update Profile</h1>
        </div>

        {/* CARD */}
        <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          p-5 md:p-8
        "
        >
          <h1
            className="
            text-2xl md:text-3xl
            font-bold text-center
            text-gray-800 mb-8
          "
          >
            User Profile
          </h1>

          {/* PROFILE IMAGE */}
          <div
            className="
            flex flex-col
            items-center
            mb-10
          "
          >
            <img
              src={updateUser?.profilePic || profile}
              alt="Profile"
              className="
              w-28 h-28 md:w-36 md:h-36
              rounded-full
              object-cover
              border-4 border-red-500
              shadow-md
            "
            />

            <div className="mt-5 w-full max-w-sm">
              <Label htmlFor="profileImage" className="mb-2 block">
                Change Profile Picture
              </Label>

              <input
                id="profileImage"
                type="file"
                onChange={handleFileChnage}
                accept="image/*"
                className="
                w-full border border-gray-300
                rounded-xl p-3
                focus:outline-none
                focus:ring-2 focus:ring-red-500
              "
              />
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
            >
              {/* FIRSTNAME */}
              <div>
                <Label className="mb-2 block">First Name</Label>

                <input
                  type="text"
                  name="firstname"
                  value={updateUser?.firstname}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="
                  w-full border border-gray-300
                  rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              {/* LASTNAME */}
              <div>
                <Label className="mb-2 block">Last Name</Label>

                <input
                  type="text"
                  name="lastname"
                  value={updateUser?.lastname}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="
                  w-full border border-gray-300
                  rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              {/* EMAIL */}
              <div>
                <Label className="mb-2 block">Email</Label>

                <input
                  type="email"
                  name="email"
                  value={updateUser?.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="
                  w-full border border-gray-300
                  rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              {/* PHONE */}
              <div>
                <Label className="mb-2 block">Phone Number</Label>

                <input
                  type="tel"
                  name="phoneNo"
                  value={updateUser?.phoneNo}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="
                  w-full border border-gray-300
                  rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              {/* ADDRESS */}
              <div className="md:col-span-2">
                <Label className="mb-2 block">Address</Label>

                <input
                  type="text"
                  name="address"
                  value={updateUser?.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="
                  w-full border border-gray-300
                  rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              {/* CITY */}
              <div>
                <Label className="mb-2 block">City</Label>

                <input
                  type="text"
                  name="city"
                  value={updateUser?.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="
                  w-full border border-gray-300
                  rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>

              {/* ZIP */}
              <div>
                <Label className="mb-2 block">Zip Code</Label>

                <input
                  type="text"
                  name="zipcode"
                  value={updateUser?.zipcode}
                  onChange={handleChange}
                  placeholder="Enter zip code"
                  className="
                  w-full border border-gray-300
                  rounded-xl p-3
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500
                "
                />
              </div>
            </div>

            {/* ROLE */}
            <div className="flex flex-wrap gap-4 items-center pt-6">
              <Label className="font-medium">Role</Label>

              <RadioGroup
                value={updateUser?.role}
                onValueChange={(value) =>
                  setUpdateUser({
                    ...updateUser,
                    role: value,
                  })
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">User</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="
              w-full mt-8
              cursor-pointer
              bg-red-500 hover:bg-red-400
              text-white
              py-6 rounded-xl
              text-base
            "
            >
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
