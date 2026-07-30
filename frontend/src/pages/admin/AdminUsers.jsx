import { serverURL } from "@/serverURL";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { Edit, Eye, Search } from "lucide-react";
// import { useEffect, useState } from "react";
// import profile from "/profile.png";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const getAllUsers = async () => {
//     const accessToken = localStorage.getItem("accessToken");

//     try {
//       const res = await axios.get(`${serverURL}/api/user/allusers`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (res.data.success) {
//         setUsers(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   const filteredUser = users.filter(
//     (user) =>
//       `${user.firstname} ${user.lastname}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <div className="pl-[350px] py-20 pr-20 mx-auto px-4">
//       <h1 className="font-bold text-2xl">Users Management</h1>
//       <p className="">View and manage registered users</p>
//       <div className="flex relative w-[300px] mt-6">
//         <Search className="absolute left-2 top-1 text-gray-600 w-5" />
//         <Input
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10"
//         />
//       </div>
//       <div className="grid grid-cols-3 gap-7 mt-7">
//         {filteredUser?.map((user, index) => {
//           return (
//             <div key={index} className="bg-red-100 p-5 rounded-lg">
//               <div className="flex items-center gap-2">
//                 <img
//                   src={user?.profilePic || profile}
//                   alt=""
//                   className="object-cover border rounded-full w-16 aspect-square border-red-500"
//                 />
//                 <div className="">
//                   <h1 className="font-semibold">
//                     {user?.firstname} {user?.lastname}
//                   </h1>
//                   <h3 className="">{user?.email}</h3>
//                 </div>
//               </div>
//               <div className="flex gap-3 mt-3">
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate(`/dashboard/users/${user?._id}`)}
//                   className="bg-green-500 hover:bg-green-500 transition cursor-pointer"
//                 >
//                   <Edit />
//                   Edit
//                 </Button>
//                 <Button variant="outline" className="">
//                   <Eye />
//                   Show Orders
//                 </Button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";
import profile from "/profile.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(`${serverURL}/api/user/allusers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUser = users.filter(
    (user) =>
      `${user.firstname} ${user.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className="
      px-4 sm:px-6 lg:px-8
      pt-24 pb-10
      min-h-screen bg-gray-50
    "
    >
      <h1 className="font-bold text-2xl">Users Management</h1>

      <p className="text-gray-500 mt-1">View and manage registered users</p>

      <div className="relative w-full sm:w-[350px] mt-6">
        <Search className="absolute left-3 top-1 text-gray-500 w-5" />

        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl"
        />
      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-6 mt-7
      "
      >
        {filteredUser?.map((user, index) => {
          return (
            <div
              key={index}
              className="
              bg-white
              p-5
              rounded-2xl
              shadow-md
              border border-gray-100
              hover:shadow-lg transition
            "
            >
              <div className="flex items-center gap-3">
                <img
                  src={user?.profilePic || profile}
                  alt=""
                  className="
                  object-cover
                  rounded-full
                  w-16 h-16
                  border-2 border-red-500
                "
                />

                <div className="min-w-0">
                  <h1 className="font-semibold">
                    {user?.firstname} {user?.lastname}
                  </h1>

                  <h3 className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </h3>
                </div>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/dashboard/users/${user?._id}`)}
                  className="
                  bg-green-500 text-white
                  hover:bg-green-500
                  cursor-pointer rounded-xl
                "
                >
                  <Edit size={16} />
                  Edit
                </Button>

                <Button variant="outline" className="rounded-xl">
                  <Eye size={16} />
                  Orders
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsers;
