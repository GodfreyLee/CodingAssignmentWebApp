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
const partController = require('../controllers/partController');

// GET all parts
router.get('/', partController.getAllParts);

// GET a single part by ID
router.get('/:id', partController.getPartById);

// POST create a new part
router.post('/', partController.createPart);

// PUT update a part by ID
router.put('/:id', partController.updatePart);

// DELETE a part by ID
router.delete('/:id', partController.deletePart);

module.exports = router;