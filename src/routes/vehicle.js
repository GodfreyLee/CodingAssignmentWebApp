// const express = require("express");
// const router = express.Router();

// // const controller = require("../controllers/bookController");
// // const validateMongoId = require("../middleware/validateMongoId");

// // router.route("/")
// //     .get(controller.book_list) // GET list of all Books
// //     .post(controller.book_create); // POST create a new Book

// // router.route("/:id")
// //     .all(validateMongoId('id'))
// //     .get(controller.book_detail) // GET one Book
// //     .put(controller.book_update) // PUT update a Book
// //     .delete(controller.book_delete); // DELETE a Book

// module.exports = router;

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// GET all vehicles
router.get('/', vehicleController.getAllVehicles);

// GET a single vehicle by ID
router.get('/:id', vehicleController.getVehicleById);

// POST create a new vehicle
router.post('/', vehicleController.createVehicle);

// PUT update a vehicle by ID
router.put('/:id', vehicleController.updateVehicle);

// DELETE a vehicle by ID
router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;