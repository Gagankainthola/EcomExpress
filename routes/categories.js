const express = require("express");
const {fetchProductCategories} = require("../controllers/categories");

const categoriesRouter = express.Router();

categoriesRouter.get("/",fetchProductCategories);

module.exports = {categoriesRouter};