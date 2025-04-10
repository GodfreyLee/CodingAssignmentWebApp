const Part = require('../models/part');
const Service = require('../models/service');

exports.getAllParts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.status(200).json(part);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPart = async (req, res) => {
  try {
    const part = new Part(req.body);
    const savedPart = await part.save();
    res.status(201).json(savedPart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePart = async (req, res) => {
  try {
    const updatedPart = await Part.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPart) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.status(200).json(updatedPart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePart = async (req, res) => {
  try {
    // Check if part is used in any services
    const servicesUsingPart = await Service.find({ partsUsed: req.params.id });
    if (servicesUsingPart.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete part as it is used in one or more services' 
      });
    }

    const deletedPart = await Part.findByIdAndDelete(req.params.id);
    if (!deletedPart) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.status(200).json({ message: 'Part deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};