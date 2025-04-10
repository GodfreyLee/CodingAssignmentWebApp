const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true, unique: true },
    owner: { type: String, required: true },
    mileage: { type: Number, required: true },
    lastServiceDate: { type: Date },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
  });
  

// Export model.
module.exports = mongoose.model("Vehicle", vehicleSchema);