const express = require("express");
const router = express.Router();
const passport = require("passport");
const Signup = require("../models/signup");
const Sale = require("../models/sale");
const { authenticate } = require("../middleware/authMiddleware");

// GET: Signup Page
router.get("/signingup", (req, res) => {
  res.render("signup");
});

// POST: Handle Signup
router.post("/signingup", async (req, res) => {
  try {
    const { username, email, password, role, branch } = req.body;

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).render("signup", { error: "Email already exists." });
    }

    await Signup.register({ username, email, role, branch }, password);
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
      return res.redirect("/produce/list");
    case "salesAgent":
      return res.redirect("/sales/saleList");
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

router.get("/salesAgentDash", authenticate(["salesAgent"]), (req, res) => {
  res.render("saleAgentDashboard", { branch: req.user.branch });
});

router.get("/directorDash", authenticate(["director"]), async (req, res) => {
  try {
    const tonnagePerBranch = await Sale.aggregate([
      { $group: { _id: "$branch", totalTonnage: { $sum: "$tonnage" } } },
    ]);
    const amountPerBranch = await Sale.aggregate([
      { $group: { _id: "$branch", totalAmount: { $sum: "$amountPaid" } } },
    ]);

    res.render("directorDashboard", {
      tonnagePerBranch,
      amountPerBranch,
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
