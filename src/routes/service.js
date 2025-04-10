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
const serviceController = require('../controllers/serviceController');

// GET all services
router.get('/', serviceController.getAllServices);

// GET a single service by ID
router.get('/:id', serviceController.getServiceById);

// POST create a new service
router.post('/', serviceController.createService);

// PUT update a service by ID
router.put('/:id', serviceController.updateService);

// DELETE a service by ID
router.delete('/:id', serviceController.deleteService);

module.exports = router;