const {fetchProductBrands} = require("../controllers/brands");

const express = require("express");

const brandsRouter = express.Router();

brandsRouter.get("/",fetchProductBrands);

module.exports = {brandsRouter};