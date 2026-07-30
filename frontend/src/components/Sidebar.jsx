// import { LayoutDashboard, PackagePlus, PackageSearch, Users } from "lucide-react";
// import { FaRegEdit } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="hidden md:block fixed border-r border-red-300 bg-red-200 x-10 w-[300px] p-10 space-y-2 h-screen">
//       <div className="text-center pt-10 px-3 space-y-2">
//         <NavLink
//           to={"/dashboard/sales"}
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-red-500 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <LayoutDashboard className="" />
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink
//           to={"/dashboard/addproduct"}
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-red-500 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <PackagePlus className="" />
//           <span>Add Products</span>
//         </NavLink>

//         <NavLink
//           to={"/dashboard/products"}
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-red-500 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <PackageSearch className="" />
//           <span>Products</span>
//         </NavLink>

//         <NavLink
//           to={"/dashboard/users"}
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-red-500 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <Users className="" />
//           <span>Users</span>
//         </NavLink>

//         <NavLink
//           to={"/dashboard/orders"}
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-red-500 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <FaRegEdit className="" />
//           <span>Orders</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
  Menu,
  X,
} from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Auto close when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const menuClass = ({ isActive }) =>
    `
    ${
      isActive
        ? "bg-red-500 text-white shadow-md"
        : "text-gray-700 hover:bg-red-100"
    }
    flex items-center gap-3
    font-semibold
    cursor-pointer
    px-4 py-3
    rounded-2xl
    transition-all duration-300
  `;

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden
          fixed top-5 left-4
          z-50
          bg-red-500
          p-2 rounded-xl
          text-white
          shadow-md
        "
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed left-0 top-0 h-screen
          w-[250px] lg:w-[270px]
          bg-gradient-to-b from-red-100 to-red-50
          border-r border-red-200
          px-5 py-8
          shadow-lg
          z-50
          transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        {/* MOBILE CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-5 right-4"
        >
          <X className="text-red-500" />
        </button>

        {/* TITLE */}
        <div className="mb-10 mt-16 px-2">
          <h1 className="text-2xl font-bold text-red-500">Admin Panel</h1>

          <p className="text-sm text-gray-500 mt-1">Manage your store</p>
        </div>

        {/* MENU */}
        <div className="space-y-3 flex flex-col h-[calc(100%-150px)]">
          <div className="space-y-3 flex-1">
            <NavLink to={"/dashboard/sales"} className={menuClass}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to={"/dashboard/addproduct"} className={menuClass}>
              <PackagePlus size={20} />
              <span>Add Products</span>
            </NavLink>

            <NavLink to={"/dashboard/products"} className={menuClass}>
              <PackageSearch size={20} />
              <span>Products</span>
            </NavLink>

            <NavLink to={"/dashboard/users"} className={menuClass}>
              <Users size={20} />
              <span>Users</span>
            </NavLink>

            <NavLink to={"/dashboard/orders"} className={menuClass}>
              <FaRegEdit size={18} />
              <span>Orders</span>
            </NavLink>
          </div>

          <div className="border-t border-red-200 pt-4 mt-4">
            <NavLink
              to={"/"}
              className="
                flex items-center gap-3
                font-semibold
                text-gray-600 hover:text-red-500 hover:bg-red-50
                cursor-pointer
                px-4 py-3
                rounded-2xl
                transition-all duration-300
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Back to Home</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
