const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    serviceType: { type: String, required: true },
    description: { type: String },
    datePerformed: { type: Date, default: Date.now },
    mileage: { type: Number, required: true },
    cost: { type: Number, required: true },
    technician: { type: String, required: true },
    partsUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }]
  });

// Export model.
module.exports = mongoose.model("Service", serviceSchema);
