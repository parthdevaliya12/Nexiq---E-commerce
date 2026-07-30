import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-[250px] lg:ml-[270px] pt-20 md:pt-0 overflow-y-auto min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
