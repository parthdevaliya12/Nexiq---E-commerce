import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

export const getDashboardAnalytics = async (req, res) => {
    try {
        // 1. Total Metrics
        const totalUsers = await userModel.countDocuments({ role: { $ne: "admin" } });
        const totalProducts = await productModel.countDocuments();
        
        // Count only paid/delivered orders for revenue
        const successfulOrders = await orderModel.find({ status: { $in: ["Paid", "Delivered"] } });
        
        const totalOrders = await orderModel.countDocuments();
        const totalRevenue = successfulOrders.reduce((acc, order) => acc + Number(order.amount), 0);

        // 2. Sales Over Time (Last 6 Months Aggregation)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const salesData = await orderModel.aggregate([
            {
                $match: {
                    status: { $in: ["Paid", "Delivered"] },
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: { 
                        month: { $month: "$createdAt" }, 
                        year: { $year: "$createdAt" } 
                    },
                    totalSales: { $sum: { $toDouble: "$amount" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        // Format sales data for frontend chart
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedSalesData = salesData.map(item => ({
            month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
            sales: item.totalSales,
            orders: item.count
        }));

        // 3. Recent Orders for quick overview
        const recentOrders = await orderModel.find()
            .populate('user', 'firstname lastname')
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            data: {
                metrics: {
                    totalUsers,
                    totalProducts,
                    totalOrders,
                    totalRevenue
                },
                salesData: formattedSalesData,
                recentOrders
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch analytics",
            error: error.message
        });
    }
};
