const express = require("express");
const router = express.Router();
const moment = require('moment');
const { authenticate } = require("../middleware/authMiddleware");
const Sale = require("../models/sale");
const Produce = require("../models/produce");

// Render sale form
router.get("/sale", authenticate(["manager", "salesAgent"]), (req, res) => {
  res.render("sale", { error: null });
});

// Create sale (branch enforced from req.user)
router.post("/sale", authenticate(["manager", "salesAgent"]), async (req, res) => {
  try {
    const {
      produceName,
      tonnage,
      amountPaid,
      buyerName,
      salesAgent,
      dateTime
    } = req.body;

    const branch = req.user.branch; // Enforce correct branch

    const existingSale = await Sale.findOne({
      produceName,
      buyerName,
      dateTime,
      amountPaid,
      branch
    });

    if (existingSale) {
      return res.render("sale", {
        error: "This sale already exists. Avoid submitting the same sale multiple times."
      });
    }

    const newSale = new Sale({
      produceName,
      tonnage,
      amountPaid,
      buyerName,
      salesAgent,
      dateTime,
      branch
    });

    await newSale.save();
    res.redirect("/sales/saleList");
  } catch (error) {
    console.error("Error saving sale:", error);
    res.status(500).render("sale", {
      error: "Failed to save sale. Please try again."
    });
  }
});

// View sales (only for logged-in user's branch)
router.get("/saleList", authenticate(["manager", "salesAgent"]), async (req, res) => {
  try {
    const sales = await Sale.find({ branch: req.user.branch });
    res.render("salelist", { sales, moment });
  } catch (error) {
    res.status(400).send("Unable to fetch sales");
  }
});

// Render update form (only if sale belongs to user's branch)
router.get("/updateSale/:id", authenticate(["manager", "salesAgent"]), async (req, res) => {
  try {
    const sale = await Sale.findOne({ _id: req.params.id, branch: req.user.branch });

    if (!sale) return res.status(403).send("Access denied.");

    res.render("updatesale", { sale, error: {} });
  } catch (error) {
    res.status(400).send("Sale not found");
  }
});

// Update sale (only if it belongs to user's branch)
router.post("/updateSale/:id", authenticate(["manager", "salesAgent"]), async (req, res) => {
  try {
    const result = await Sale.findOneAndUpdate(
      { _id: req.params.id, branch: req.user.branch },
      req.body
    );

    if (!result) return res.status(403).send("Update not allowed.");

    res.redirect("/sales/saleList");
  } catch (error) {
    res.status(400).send("Update failed");
  }
});

// Delete sale (only if from user's branch)
router.post("/deleteSale", authenticate(["manager", "salesAgent"]), async (req, res) => {
  try {
    const result = await Sale.findOneAndDelete({
      _id: req.body.id,
      branch: req.user.branch
    });

    if (!result) return res.status(403).send("Delete not allowed.");

    res.redirect("back");
  } catch (error) {
    res.status(400).send("Delete failed");
  }
});

module.exports = router;
