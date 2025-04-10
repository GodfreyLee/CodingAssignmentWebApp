const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const partSchema = new Schema({
    name: { type: String, required: true },
    partNumber: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantityInStock: { type: Number, required: true, min: 0 },
    compatibleVehicles: [{ type: String }],
    supplier: { type: String }
});

// Export model.
module.exports = mongoose.model("Part", partSchema);
