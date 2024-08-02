const {
  createProduct,
  fetchAllProductsFilter,
  fetchProductById,
  editProductById,
} = require("../controllers/products");
const express = require("express");
const productRouter = express.Router();

productRouter
  .post("/", createProduct)
  .get("/", fetchAllProductsFilter)
  .get("/:id", fetchProductById)
  .patch("/:id", editProductById);

module.exports = { productRouter };
