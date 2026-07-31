import { serverURL } from "@/serverURL";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log(formData);
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${serverURL}/api/user/register`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );
//       if (res.data.success) {
//         // Handle successful signup
//         toast.success(res.data.message);
//         navigate("/verify");
//       }
//     } catch (error) {
//       console.log(error);
//       const errorMsg = error?.response?.data?.message || error?.message || "Registration failed";
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <Card className="w-full max-w-sm">
//         <CardHeader>
//           <CardTitle>Sign up for an account</CardTitle>
//           <CardDescription>
//             Enter your information below to create an account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-3">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="firstname">First Name</Label>
//                 <Input
//                   id="firstname"
//                   type="text"
//                   name="firstname"
//                   placeholder="John"
//                   value={formData.firstname}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="lastname">Last Name</Label>
//                 <Input
//                   id="lastname"
//                   type="text"
//                   name="lastname"
//                   placeholder="Doe"
//                   value={formData.lastname}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="m@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//               </div>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 {showPassword ? (
//                   <EyeOff
//                     onClick={() => setShowPassword(false)}
//                     className="w-5 h-5 absolute right-5 bottom-2 "
//                   />
//                 ) : (
//                   <Eye
//                     onClick={() => setShowPassword(true)}
//                     className="w-5 h-5 absolute right-5 bottom-2 "
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           <Button
//             type="submit"
//             className="w-full cursor-pointer bg-red-500 hover:bg-red-400 transition"
//             onClick={handleSubmit}
//           >
//             {loading ? (
//               <Loader2 className="animate-spin mr-2 h-4 w-4" />
//             ) : (
//               "Sign Up"
//             )}
//           </Button>
//           <Button variant="outline" className="w-full">
//             Continue with Google
//           </Button>
//           <p className="text-sm text-center">
//             Already have an account?{" "}
//             <Link
//               to={"/login"}
//               className="text-blue-500 cursor-pointer hover:underline"
//             >
//               Login
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default Signup;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const res = await axios.post(`${serverURL}/api/user/google`, {
        token: credentialResponse.credential,
      });
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error?.response?.data?.message || "Google Registration failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverURL}/api/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);

      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-50 via-white to-red-50 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-200/40 mix-blend-multiply filter blur-[100px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-100/50 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[20%] w-[40%] h-[40%] rounded-full bg-pink-100/40 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none"></div>

      <Card
        className="
        w-full
        max-w-6xl
        rounded-[2.5rem]
        overflow-hidden
        border border-white/50
        bg-white/40
        backdrop-blur-xl
        shadow-[0_20px_80px_rgba(220,38,38,0.1)]
        animate-in zoom-in-95 fade-in duration-700 ease-out
        relative z-10
      "
      >
        <div className="grid lg:grid-cols-2 h-full flex-col-reverse lg:flex-row">
          
          {/* LEFT SIDE: BRANDING */}
          <div
            className="
            hidden lg:flex
            relative
            flex-col
            justify-center
            items-center
            bg-gradient-to-bl from-red-500 via-red-600 to-rose-600
            text-white
            px-12
            overflow-hidden
          "
          >
            {/* abstract glass shapes */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl -bottom-[10%] -left-[10%] mix-blend-overlay"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full bg-orange-300/20 blur-3xl top-[10%] -right-[10%] mix-blend-overlay"></div>
            
            {/* decorative UI elements */}
            <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md -rotate-12 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-3xl mb-8 flex items-center justify-center shadow-2xl -rotate-3">
                <span className="text-4xl font-black text-red-500">N</span>
              </div>
              
              <h2 className="text-5xl font-black mb-6 tracking-tight">One Of Us?</h2>

              <p
                className="
                text-red-100
                text-lg
                max-w-md
                leading-relaxed
                mb-12
                font-medium
              "
              >
                If you already have an account, just sign in. We've missed you!
              </p>

              <Link to={"/login"}>
                <button
                  className="
                  px-12
                  py-4
                  bg-white/10
                  backdrop-blur-md
                  border-2
                  border-white/50
                  rounded-2xl
                  font-bold
                  text-lg
                  hover:bg-white
                  hover:text-red-600
                  transition-all
                  duration-300
                  shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                  hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)]
                  hover:-translate-y-1
                "
                >
                  SIGN IN
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <CardContent
            className="
            bg-white/80
            px-8
            sm:px-14
            md:px-20
            py-16
            flex
            flex-col
            justify-center
          "
          >
            <div className="w-full max-w-md mx-auto">
              <div className="mb-10 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100 fill-mode-both">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
                  Create Account
                </h1>
                <p className="text-gray-500 font-medium text-lg">
                  Join Nexiq and experience the best shopping.
                </p>
              </div>

              {/* social buttons */}
              <div className="flex justify-center w-full mb-8 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200 fill-mode-both">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google Registration Failed")}
                    size="large"
                    theme="outline"
                    shape="rectangular"
                  />
                </div>
              </div>

              <div className="relative flex items-center justify-center mb-8 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300 fill-mode-both">
                <div className="absolute border-t-2 border-gray-100 w-full"></div>
                <div className="relative bg-white/80 px-4 text-sm font-bold text-gray-400 uppercase tracking-widest backdrop-blur-sm">
                  Or Register With Email
                </div>
              </div>

              <div className="space-y-5 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-400 fill-mode-both">
                {/* NAME FIELDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="
                    h-14
                    px-5
                    rounded-2xl
                    bg-gray-50/50
                    border-2 border-gray-100
                    focus:bg-white
                    focus:ring-0
                    focus:border-red-500
                    transition-all
                    text-lg
                    placeholder:text-gray-400
                  "
                  />

                  <Input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="
                    h-14
                    px-5
                    rounded-2xl
                    bg-gray-50/50
                    border-2 border-gray-100
                    focus:bg-white
                    focus:ring-0
                    focus:border-red-500
                    transition-all
                    text-lg
                    placeholder:text-gray-400
                  "
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="
                    h-14
                    px-5
                    rounded-2xl
                    bg-gray-50/50
                    border-2 border-gray-100
                    focus:bg-white
                    focus:ring-0
                    focus:border-red-500
                    transition-all
                    text-lg
                    placeholder:text-gray-400
                  "
                  />
                </div>

                {/* PASSWORD */}
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="
                    h-14
                    px-5
                    pr-14
                    rounded-2xl
                    bg-gray-50/50
                    border-2 border-gray-100
                    focus:bg-white
                    focus:ring-0
                    focus:border-red-500
                    transition-all
                    text-lg
                    placeholder:text-gray-400
                  "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-red-500
                      transition-colors
                      focus:outline-none
                    "
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* SIGNUP BUTTON */}
              <Button
                type="submit"
                onClick={handleSubmit}
                className="
                w-full
                h-14
                mt-8
                rounded-2xl
                bg-red-500
                hover:bg-red-600
                text-white font-bold text-lg
                transition-all
                duration-300
                hover:-translate-y-1
                shadow-[0_10px_25px_rgba(239,68,68,0.4)]
                hover:shadow-[0_15px_35px_rgba(239,68,68,0.5)]
                animate-in slide-in-from-bottom-5 fade-in duration-700 delay-500 fill-mode-both
              "
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* MOBILE LOGIN */}
      <div className="lg:hidden absolute bottom-8 text-center w-full z-20">
        <p className="text-base font-medium text-gray-600 bg-white/80 backdrop-blur-md py-3 px-6 rounded-full inline-block shadow-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="
            text-red-500
            font-bold
            hover:text-red-600
            transition-colors
          "
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
