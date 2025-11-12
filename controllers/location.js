const Location = require("../models/location");

// List of all Locations
exports.location_list = async function (req, res) {
  try {
    const locations = await Location.find();
    res.send(locations);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};

// Detail for a specific Location
exports.location_detail = async function (req, res) {
  try {
    const result = await Location.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "document for id ${req.params.id} not found"}`);
  }
};

// Handle Location create on POST
exports.location_create_post = async function (req, res) {
  console.log(req.body);
  const document = new Location({
    city: req.body.city,
    state: req.body.state,
    population: req.body.population,
  });
  try {
    const result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};

// Handle Location delete on DELETE
exports.location_delete = async function (req, res) {
  try {
    const result = await Location.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};

// Handle Location update on PUT
exports.location_update_put = async function (req, res) {
  try {
    const toUpdate = await Location.findById(req.params.id);
    if (req.body.city) toUpdate.city = req.body.city;
    if (req.body.state) toUpdate.state = req.body.state;
    if (req.body.population) toUpdate.population = req.body.population;
    const result = await toUpdate.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};
