const Service = require('../models/service');
const Vehicle = require('../models/vehicle');
const Part = require('../models/part');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('vehicle')
      .populate('partsUsed');
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('vehicle')
      .populate('partsUsed');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createService = async (req, res) => {
  try {
    // Verify vehicle exists
    const vehicle = await Vehicle.findById(req.body.vehicle);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Verify parts exist
    if (req.body.partsUsed) {
      const parts = await Part.find({ _id: { $in: req.body.partsUsed } });
      if (parts.length !== req.body.partsUsed.length) {
        return res.status(404).json({ message: 'One or more parts not found' });
      }
    }

    const service = new Service(req.body);
    const savedService = await service.save();

    // Add service to vehicle's services array
    await Vehicle.findByIdAndUpdate(
      req.body.vehicle,
      { $push: { services: savedService._id } }
    );

    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vehicle').populate('partsUsed');
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Remove service from vehicle's services array
    await Vehicle.findByIdAndUpdate(
      service.vehicle,
      { $pull: { services: service._id } }
    );

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};