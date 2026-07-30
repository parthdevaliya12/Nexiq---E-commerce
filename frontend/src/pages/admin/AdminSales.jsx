import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Loader2, TrendingUp, Users, Package, ShoppingBag } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminSales = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/analytics/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (res.data.success) {
          setAnalytics(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-8 text-center text-gray-500">Failed to load data.</div>
    );
  }

  // Chart Data Preparation
  const chartData = {
    labels: analytics.salesData.map((d) => d.month),
    datasets: [
      {
        label: "Revenue (₹)",
        data: analytics.salesData.map((d) => d.sales),
        borderColor: "rgb(239, 68, 68)", // Red 500
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgb(239, 68, 68)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(239, 68, 68)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `₹ ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.04)",
          drawBorder: false,
        },
        ticks: {
          callback: function (value) {
            return "₹" + value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sales Overview</h1>
        <p className="text-gray-500 mt-1">Track your store's real-time performance and analytics.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-900">
              ₹ {analytics.metrics.totalRevenue.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {analytics.metrics.totalOrders.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Active Users</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {analytics.metrics.totalUsers.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {analytics.metrics.totalProducts.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
          <span className="bg-red-50 text-red-500 px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider">Last 6 Months</span>
        </div>
        
        <div className="w-full h-[400px]">
          {analytics.salesData.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                No revenue data available for the last 6 months.
             </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminSales;
