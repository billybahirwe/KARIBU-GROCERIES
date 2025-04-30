const express = require('express');
const router = express.Router();
const { directorOnly } = require('../middleware/authMiddleware');
const Sale = require('../models/sale');
const CreditSale = require('../models/creditSale');

// Format UGX numbers with commas
const formatUGX = (num) => {
  return Number(num || 0).toLocaleString('en-UG', {
    style: 'decimal',
    maximumFractionDigits: 0
  });
};

router.get('/dashboard', directorOnly, async (req, res) => {
  try {
    // Tonnage per branch
    const tonnagePerBranch = await Sale.aggregate([
      { $group: { _id: '$branch', totalTonnage: { $sum: '$tonnage' } } }
    ]);

    // Amount paid per branch
    const amountPerBranchRaw = await Sale.aggregate([
      { $group: { _id: '$branch', totalAmount: { $sum: '$amountPaid' } } }
    ]);

    const amountPerBranch = amountPerBranchRaw.map(item => ({
      _id: item._id,
      totalAmount: formatUGX(item.totalAmount)
    }));

    // Total credit sales
    const totalCreditSalesAgg = await CreditSale.aggregate([
      { $group: { _id: null, totalCredit: { $sum: { $toDouble: '$amountDue' } } } }
    ]);

    const totalCreditSales = formatUGX(totalCreditSalesAgg[0]?.totalCredit || 0);

    // Overall performance
    const overallPerformanceAgg = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: '$amountPaid' } } }
    ]);

    const overallPerformance = formatUGX(overallPerformanceAgg[0]?.total || 0);

    // Render dashboard
    res.render('directorDashboard', {
      tonnagePerBranch,
      amountPerBranch,
      totalCreditSales,
      overallPerformance
    });

  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).send('Error fetching director data');
  }
});

module.exports = router;
