import { ShoppingCart, Menu, X, LogOut, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { useState, useEffect } from "react";
import logo from "/logo.png";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const admin = user?.role?.trim()?.toLowerCase() === "admin";
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2"
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LOGO AREA */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-red-500/20">
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="leading-tight hidden sm:block">
              <h1 className="font-black text-2xl text-gray-900 tracking-tight">
                Nex<span className="text-red-600">iq</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                Premium Store
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 bg-white/50 border border-gray-100 rounded-full px-8 py-3 shadow-sm backdrop-blur-md">
              <li>
                <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* SEARCH ICON (Mock) */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* CART */}
            <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-700 bg-white shadow-sm border border-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] text-[10px] font-bold bg-red-600 text-white rounded-full flex items-center justify-center shadow-md">
                {cart?.items?.length || 0}
              </span>
            </Link>

            {/* USER ACTIONS */}
            <div className="hidden md:flex items-center gap-4 border-l border-gray-200 pl-5">
              {user ? (
                <div className="flex items-center gap-4">
                  {admin && (
                    <Link to={`/dashboard/sales`} title="Admin Dashboard">
                      <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors cursor-pointer shadow-sm">
                        A
                      </div>
                    </Link>
                  )}
                  <Link to={`/profile/${user._id}`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform bg-red-600 flex items-center justify-center text-white font-bold text-lg">
                      {user?.profilePic ? (
                        <img src={user.profilePic} alt="profile" className="w-full h-full object-cover" />
                      ) : (
                        user.firstname[0]
                      )}
                    </div>
                  </Link>
                  <Button onClick={handleLogout} variant="ghost" className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full px-3 h-10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => navigate("/login")} className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 h-10 text-sm font-semibold shadow-md transition-transform hover:-translate-y-0.5">
                  Sign In
                </Button>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button onClick={() => setMobileMenu(true)} className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU FULL SCREEN OVERLAY */}
      <div className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-500 ease-in-out md:hidden flex flex-col ${mobileMenu ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain rounded-xl shadow-sm border border-gray-100" />
            <h1 className="font-black text-2xl text-gray-900 tracking-tight">Nex<span className="text-red-600">iq</span></h1>
          </div>
          <button onClick={() => setMobileMenu(false)} className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-8">
          <nav className="flex flex-col gap-6 text-2xl font-bold text-gray-900">
            <Link to="/" onClick={() => setMobileMenu(false)} className="hover:text-red-600 transition-colors">Home</Link>
            <Link to="/products" onClick={() => setMobileMenu(false)} className="hover:text-red-600 transition-colors">Shop</Link>
            <Link to="/cart" onClick={() => setMobileMenu(false)} className="flex items-center justify-between hover:text-red-600 transition-colors">
              <span>My Cart</span>
              <span className="bg-red-600 text-white py-1 px-3 rounded-full text-sm font-bold shadow-md">{cart?.items?.length || 0}</span>
            </Link>
          </nav>

          <hr className="border-gray-100" />

          {user ? (
            <div className="flex flex-col gap-6">
              <Link to={`/profile/${user._id}`} onClick={() => setMobileMenu(false)} className="flex items-center gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-100 hover:border-red-100 hover:bg-red-50 transition-colors">
                <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-sm bg-red-600 text-white flex items-center justify-center font-bold text-xl">
                  {user?.profilePic ? <img src={user.profilePic} alt="profile" className="w-full h-full object-cover" /> : user.firstname[0]}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{user.firstname} {user.lastname}</p>
                  <p className="text-sm text-gray-500 font-medium">Manage Account</p>
                </div>
              </Link>
              
              {admin && (
                <Link to={`/dashboard/sales`} onClick={() => setMobileMenu(false)} className="bg-red-50 text-red-600 font-bold p-4 rounded-3xl border border-red-100 text-center hover:bg-red-100 transition-colors">
                  Go to Admin Dashboard
                </Link>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 text-sm font-medium text-center mb-2">Sign in to access your orders and profile.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          {user ? (
            <Button onClick={() => { handleLogout(); setMobileMenu(false); }} className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl h-14 text-lg shadow-xl shadow-gray-900/20 transition-all">
              <LogOut className="w-5 h-5 mr-3" /> Sign Out
            </Button>
          ) : (
            <Button onClick={() => { navigate("/login"); setMobileMenu(false); }} className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 text-lg shadow-xl shadow-red-600/20 transition-all">
              Sign In to Continue
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
