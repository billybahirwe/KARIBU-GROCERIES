const express = require('express');
const router = express.Router();
const CreditSale = require('../models/creditSale');

// GET credit sales list
router.get('/credit/list', async (req, res) => {
  try {
    const branch = req.user.branch;
    const creditSales = await CreditSale.find({ branch }).sort({ dueDate: 1 });
    res.render('creditSaleList', { creditSales });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching credit sales.');
  }
});

// GET credit sale form
router.get('/credit', (req, res) => {
  res.render('creditSaleForm', {
    credit: {},
    error: null
  });
});

// POST create credit sale
router.post('/credit', async (req, res) => {
  try {
    const credit = new CreditSale({
      ...req.body,
      branch: req.user.branch // correctly attach branch
    });
    await credit.save();
    res.redirect('/sales/credit/list');
  } catch (err) {
    console.error(err);
    res.render('creditSaleForm', {
      credit: req.body,
      error: 'Failed to save credit sale. Please ensure all required fields are correctly filled.'
    });
  }
});

// GET edit credit sale form
router.get('/credit/edit/:id', async (req, res) => {
  try {
    const credit = await CreditSale.findOne({
      _id: req.params.id,
      branch: req.user.branch
    });

    if (!credit) {
      return res.status(403).send('Access denied.');
    }

    res.render('editCreditSale', { credit, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching credit sale details.');
  }
});

// POST update credit sale
router.post('/credit/edit/:id', async (req, res) => {
  try {
    const result = await CreditSale.findOneAndUpdate(
      { _id: req.params.id, branch: req.user.branch },
      req.body,
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(403).send('Update not allowed.');
    }

    res.redirect('/sales/credit/list');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the credit sale.');
  }
});

// POST delete credit sale
router.post('/credit/delete/:id', async (req, res) => {
  try {
    const result = await CreditSale.findOneAndDelete({
      _id: req.params.id,
      branch: req.user.branch
    });

    if (!result) {
      return res.status(403).send('Delete not allowed.');
    }

    res.redirect('/sales/credit/list');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while deleting the credit sale.');
  }
});

module.exports = router;
