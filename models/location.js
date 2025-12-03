const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  Country: {
    type: String,
    required: true
  },
  primaryLanguage: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true,
    min: [0, "Population cannot be less than 0"],
    max: [2000000000, "Population cannot exceed 2 billion"]
  }
});

module.exports = mongoose.model("Location", locationSchema);
