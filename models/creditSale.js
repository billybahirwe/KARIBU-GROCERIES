const mongoose = require('mongoose');

const creditSaleSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    required: [true, 'Buyer name is required'],
    minlength: [2, 'Buyer name must be at least 2 characters'],
    match: [/^[a-zA-Z0-9\s]+$/, 'Buyer name must be alphanumeric'],
  },
  nin: {
    type: String,
    required: [true, 'National ID (NIN) is required'],
    match: [/^CF[A-Z0-9]{12}$/, 'NIN must follow valid format like CF123456789012'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    minlength: [2, 'Location must be at least 2 characters'],
    match: [/^[a-zA-Z0-9\s]+$/, 'Location must be alphanumeric'],
  },
  contact: {
    type: String,
    required: [true, 'Contact is required'],
    match: [/^\+\d{7,15}$/, 'Contact must start with + and be 7 to 15 digits'],
  },
  amountDue: {
    type: Number,
    required: [true, 'Amount due is required'],
    min: [10000, 'Amount must be at least 5 characters in UGX'], // i.e. minimum 10000 UGX
  },
  salesAgent: {
    type: String,
    required: [true, 'Sales agent name is required'],
    minlength: [2, 'Sales agent name must be at least 2 characters'],
    match: [/^[a-zA-Z0-9\s]+$/, 'Sales agent name must be alphanumeric'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
  },
  produceName: {
    type: String,
    required: [true, 'Produce name is required'],
    minlength: [2, 'Produce name must be at least 2 characters'],
    match: [/^[a-zA-Z0-9\s]+$/, 'Produce name must be alphanumeric'],
  },
  produceType: {
    type: String,
    required: [true, 'Produce type is required'],
    trim: true,
  },
  tonnage: {
    type: Number,
    required: [true, 'Tonnage is required'],
    min: [0.01, 'Tonnage must be a positive number'],
  },
  dispatchDate: {
    type: Date,
    required: [true, 'Dispatch date is required'],
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  branch: {
    type: String,
    enum: ['Maganjo', 'Matugga'],
    required: [true, 'Branch is required'],
  },
});

module.exports = mongoose.model('CreditSale', creditSaleSchema);
