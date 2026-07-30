import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";
import { getDashboardAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, isAdmin, getDashboardAnalytics);

export default router;
