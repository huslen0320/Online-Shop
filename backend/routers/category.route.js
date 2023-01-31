const express = require('express');

const router = express.Router();
const category = require("../controllers/category.controller.js");

router.get("/category", category.getAll);
router.post("/category", category.create);
router.delete("/category/:id", category.delete);
router.put("/category", category.update);

module.exports = router;