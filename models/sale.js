// models/sale.js

const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true,
    required: [true, "Produce name is required."],
    minlength: [2, "Produce name must be at least 2 characters long."]
  },
  
  tonnage: {
    type: Number,
    required: [true, "Tonnage is required."]
  },

  amountPaid: {
    type: Number,
    required: [true, "Amount paid is required."],
    min: [1000, "Amount paid must be at least 1000 UGX."]
  },

  buyerName: {
    type: String,
    trim: true,
    required: [true, "Buyer name is required."],
    minlength: [2, "Buyer name must be at least 2 characters long."]
  },

  salesAgent: {
    type: String,
    trim: true,
    required: [true, "Sales agent is required."],
    minlength: [2, "Sales agent must be at least 2 characters long."]
  },

  branch: {
    type: String,
    enum: ['Maganjo', 'Matugga'],
    required: [true, "Branch is required."]
  },

  dateTime: {
    type: Date,
    required: [true, "Transaction date is required."]
  }
});

module.exports = mongoose.model("Sale", saleSchema);
