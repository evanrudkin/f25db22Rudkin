const mongoose = require("mongoose");

// Define a schema that matches what your collection will hold
const locationSchema = mongoose.Schema({
  Country: { type: String, required: true },
  primaryLanguage: { type: String, required: true },
  population: { type: Number, min: 0 }
});

// Export the model so controllers can use it
module.exports = mongoose.model("Location", locationSchema);
