// const Verify = () => {
//   return (
//     <div className="relative w-full h-[760px] overflow-hidden">
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
//           <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
//           <p className="text-gray-600">
//             Please check your email for a verification link.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Verify;
const Verify = () => {
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
        "
        >
          <span className="text-3xl">📩</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Verify Your Email
        </h1>

        <p className="text-gray-500 leading-7 text-sm sm:text-base">
          Please check your email inbox and click the verification link to
          activate your account.
        </p>

        <div className="mt-6 text-red-500 font-medium text-sm">
          Waiting for verification...
        </div>
      </div>
    </div>
  );
};

export default Verify;
