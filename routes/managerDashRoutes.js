const express = require("express");
const router = express.Router();
const Produce = require("../models/produce");
const Sale = require("../models/sale");
const CreditSale = require("../models/creditSale");

// Middleware for role-based access
const { ensureRole } = require("../middleware/authMiddleware");

// Manager Dashboard Route
router.get("/manager/dashboard", ensureRole("manager"), async (req, res) => {
  try {
    const branch = req.user?.branch || "Unknown";

    // Fetch produce, sales, and credit sales for this branch
    const produceList = await Produce.find({ branch }).lean();
    const sales = await Sale.find({ branch }).lean();
    const creditSales = await CreditSale.find({ branch }).lean();

    // Basic summary metrics
    const totalProduce = produceList?.length || 0;
    const totalSales = sales?.length || 0;
    const totalCreditSales = creditSales?.length || 0;

    // Compute remaining stock
    const stockSummary = {};

    produceList.forEach(item => {
      const key = item.produceName;
      stockSummary[key] = (stockSummary[key] || 0) + Number(item.tonnage);
    });

    sales.forEach(sale => {
      const key = sale.produceName;
      if (stockSummary[key] !== undefined) {
        stockSummary[key] -= Number(sale.tonnage);
      }
    });

    // Generate depletion alerts
    const alerts = Object.entries(stockSummary).map(([produce, tonnage]) => ({
      produce,
      tonnage: tonnage < 0 ? 0 : tonnage,
      alert: tonnage <= 200
    }));

    // Render dashboard
    res.render("managerDashboard", {
      alerts: Array.isArray(alerts) ? alerts : [],
      totalProduce,
      totalSales,
      totalCreditSales,
      branch
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).render("managerDashboard", {
      alerts: [],
      totalProduce: 0,
      totalSales: 0,
      totalCreditSales: 0,
      branch: "Unknown",
      error: "Failed to load manager dashboard."
    });
  }
});

// Stock View Route
router.get("/stock", ensureRole("manager"), async (req, res) => {
  try {
    const branch = req.user?.branch || "Unknown"; // fallback if no branch

    // Fetch stock data from Produce and Sale models
    const produceItems = await Produce.find({ branch }).lean();
    const sales = await Sale.find({ branch }).lean();

    // Compute remaining stock
    const stockData = produceItems.map(item => {
      const sold = sales
        .filter(s => s.produceName === item.produceName)
        .reduce((sum, s) => sum + s.tonnage, 0);

      const remaining = item.tonnage - sold;

      return {
        produce: item.produceName,
        tonnage: remaining,
        alert: remaining < 200 // Assuming low stock alert threshold is 200kg
      };
    });

    // Render stock view
    res.render("stockView", {
      stockData,
      branch
    });
  } catch (err) {
    console.error("Stock View error:", err);
    res.status(500).render("stockView", {
      stockData: [],
      branch: "Unknown",
      error: "Failed to load stock data."
    });
  }
});
router.get("/", (req, res) => {
  res.redirect("/managerDash/manager/dashboard");
});


module.exports = router;
