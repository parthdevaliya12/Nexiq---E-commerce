import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get("http://localhost:8000/api/order/admin-orders", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.put(
        `http://localhost:8000/api/order/update-status/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success("Order status updated successfully");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 w-full min-h-screen bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">All Orders</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm p-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">No orders found.</p>
        </div>
      ) : (
        <>
          {/* MOBILE VIEW (Vertical Cards) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Order ID</p>
                    <p className="font-medium text-gray-700 text-sm truncate w-[200px]">{order._id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Date</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="border-t border-b border-gray-50 py-3 my-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Customer</p>
                  <p className="font-medium text-gray-800">{order.user?.firstname} {order.user?.lastname}</p>
                  <p className="text-xs text-gray-500">{order.user?.email}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total</p>
                    <p className="font-bold text-gray-800 text-lg">₹{order.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Status</p>
                    <select
                      className={`text-xs font-semibold rounded-lg px-2 py-1.5 border ${
                        order.status === "Paid"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : order.status === "Delivered"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : order.status === "Failed"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      } focus:outline-none focus:ring-2 focus:ring-red-200 cursor-pointer`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-2 rounded-xl text-sm h-10">
                  View Details
                </Button>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW (Table) */}
          <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 w-full overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="font-semibold text-gray-600 p-4">Order ID</th>
                    <th className="font-semibold text-gray-600 p-4">Customer</th>
                    <th className="font-semibold text-gray-600 p-4">Date</th>
                    <th className="font-semibold text-gray-600 p-4">Total</th>
                    <th className="font-semibold text-gray-600 p-4">Status</th>
                    <th className="font-semibold text-gray-600 p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                      <td className="font-medium text-gray-700 p-4">
                        {order._id}
                      </td>
                      <td className="p-4">
                        {order.user?.firstname} {order.user?.lastname}
                        <div className="text-xs text-gray-400">{order.user?.email}</div>
                      </td>
                      <td className="text-gray-500 p-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="font-semibold text-gray-800 p-4">
                        ₹{order.amount}
                      </td>
                      <td className="p-4">
                        <select
                          className={`text-sm rounded-lg px-2 py-1 border ${
                            order.status === "Paid"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : order.status === "Delivered"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : order.status === "Failed"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          } focus:outline-none focus:ring-2 focus:ring-red-200 cursor-pointer`}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </td>
                      <td className="text-right p-4">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
