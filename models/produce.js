const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
  produceName: {
    type: String,
    trim: true,
    required: [true, "Produce name is required"],
    minlength: [2, "Produce name must be at least 2 characters"],
    match: [/^[a-zA-Z0-9 ]+$/, "Produce name must be alphanumeric"]
  },

  produceType: {
    type: String,
    trim: true,
    required: [true, "Produce type is required"],
    minlength: [2, "Produce type must be at least 2 characters"],
    match: [/^[a-zA-Z ]+$/, "Produce type must contain only letters"]
  },

  date: {
    type: Date,
    required: [true, "Date is required"]
  },

  time: {
    type: String, // You can use String to store time like "14:30"
    required: [true, "Time of produce is required"]
  },

  tonnage: {
    type: Number,
    required: [true, "Tonnage is required"],
    min: [1, "Tonnage must be at least 1"]
  },

  cost: {
    type: Number,
    required: [true, "Cost is required"],
    min: [10000, "Cost must be at least 5 digits (UGX)"]
  },

  dealerName: {
    type: String,
    trim: true,
    required: [true, "Dealer name is required"],
    minlength: [2, "Dealer name must be at least 2 characters"],
    match: [/^[a-zA-Z0-9 ]+$/, "Dealer name must be alphanumeric"]
  },

  branch: {
    type: String,
    enum: ['Maganjo', 'Matugga'], // If you only support these
    required: [true, "Branch is required"]
  },

  contact: {
    type: String,
    trim: true,
    required: [true, "Contact number is required"],
    match: [/^\+\d{7,15}$/, "Contact must be a valid phone number starting with +"]
  },

  price: {
    type: Number,
    required: [true, "Selling price is required"],
    min: [100, "Price must be greater than 100 UGX"]
  },

  image: {
    type: String, // filename like "beans.jpg"
    trim: true
  }
});

module.exports = mongoose.model("Produce", produceSchema);
