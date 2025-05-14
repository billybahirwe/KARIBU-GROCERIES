const express = require("express");
const router = express.Router();
const passport = require("passport");
const Signup = require("../models/signup");
const Sale = require("../models/sale");
const CreditSale = require("../models/creditSale");
const { authenticate } = require("../middleware/authMiddleware");

// GET: Signup Page
router.get("/signingup", (req, res) => {
  res.render("signup");
});

// POST: Handle Signup
router.post("/signingup", async (req, res) => {
  try {
    const {name,username, email, password, role, branch } = req.body;

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).render("signup", { error: "Email already exists." });
    }

    await Signup.register({ name,username, email, role, branch }, password);
    res.redirect("/login");
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).render("signup", { error: "Unexpected error during signup." });
  }
});

// GET: Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// POST: Handle Login
router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  console.log("Logged in as:", req.user.role, "| Branch:", req.user.branch);

  // Save branch in session (optional, if needed later)
  req.session.branch = req.user.branch;

  // Redirect by role
  switch (req.user.role) {
    case "manager":
      return res.redirect("/managerDash/manager/dashboard");
    case "salesAgent":
      return res.redirect("/sales/dashboard");
    case "director":
      return res.redirect("/directorDash");
    default:
      return res.send("No role assigned in the system.");
  }
});

// GET: Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send("Error logging out");
    req.session.destroy(() => res.redirect("/"));
  });
});

// Dashboards
router.get("/managerDash", authenticate(["manager"]), (req, res) => {
  res.render("managerDashboard", { branch: req.user.branch });
});

router.get("/sales/dashboard", authenticate(["salesAgent"]), (req, res) => {
  res.render("saleAgentDashboard", {
    agentName: req.user.name,
    branch: req.user.branch
  });
});

router.get("/directorDash", authenticate(["director"]), async (req, res) => {
  try {
    const tonnagePerBranch = await Sale.aggregate([
      { $group: { _id: "$branch", totalTonnage: { $sum: "$tonnage" } } },
    ]);
    const amountPerBranch = await Sale.aggregate([
      { $group: { _id: "$branch", totalAmount: { $sum: "$amountPaid" } } },
    ]);
    const totalCreditSalesResult = await CreditSale.aggregate([
      { $group: { _id: null, totalCredit: { $sum: "$amountDue" } } },
    ]);
    const totalCreditSales = totalCreditSalesResult[0]?.totalCredit || 0;

    const overallPerformanceResult = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$amountPaid" } } },
    ]);
    const overallPerformance = overallPerformanceResult[0]?.total || 0;

    res.render("directorDashboard", {
      tonnagePerBranch,
      amountPerBranch,
      totalCreditSales,
      overallPerformance
    });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.render("directorDashboard", {
      tonnagePerBranch: [],
      amountPerBranch: [],
      error: "Failed to load data.",
    });
  }
});

module.exports = router;
