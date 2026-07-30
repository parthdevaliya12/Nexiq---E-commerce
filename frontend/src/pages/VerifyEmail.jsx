import { serverURL } from "@/serverURL";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";

// function VerifyEmail() {
//   const { token } = useParams();
//   const [status, setStatus] = useState("Verifying...");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const res = await axios.post(
//           `${serverURL}/api/user/verify`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//         if (res.data.success) {
//           toast.success("Email verified successfully");
//           setTimeout(() => {
//             navigate("/login");
//           }, 2000);
//         }
//       } catch (error) {
//         console.log(error);
//         const errorMsg = error?.response?.data?.message || "Verification failed. Please try again.";
//         setStatus(errorMsg);
//         toast.error(errorMsg);
//       }
//     };

//     verifyEmail();
//   }, [token, navigate]);

//   return (
//     <div className="relative w-full h-[760px] overflow-hidden">
//       <div className="min-h-screen flex justify-center items-center">
//         <div className="bg-white p-6 rounded-2xl text-center w-[90%] max-w-md">
//           <h2 className="text-gray-600">{status}</h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerifyEmail;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${serverURL}/api/user/verify`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.data.success) {
          toast.success("Email verified successfully");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.log(error);

        const errorMsg =
          error?.response?.data?.message ||
          "Verification failed. Please try again.";

        setStatus(errorMsg);
        toast.error(errorMsg);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div
      className="
      min-h-screen
      flex items-center justify-center
      px-4 sm:px-6
      bg-gradient-to-br from-red-50 via-white to-red-100
    "
    >
      <div
        className="
        bg-white
        p-6 sm:p-8 md:p-10
        rounded-3xl
        shadow-xl
        border border-red-100
        w-full max-w-md
        text-center
      "
      >
        <div
          className="
          w-16 h-16
          mx-auto mb-5
          rounded-full
          bg-red-100
          flex items-center justify-center
          animate-pulse
        "
        >
          <span className="text-3xl">🔐</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Email Verification
        </h1>

        <p
          className="
          text-gray-500
          text-sm sm:text-base
          leading-7
        "
        >
          {status}
        </p>

        <div className="mt-6 text-red-500 font-medium text-sm">
          Redirecting...
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
