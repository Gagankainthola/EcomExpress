const express = require("express");
const {addToCart, fetchCartItemsById, updateCartItem, deleteFromCart} = require("../controllers/carts");
const cartRouter = express.Router();

cartRouter.post("/",addToCart).get("/",fetchCartItemsById).post("/:id",updateCartItem).delete("/:id",deleteFromCart);

module.exports = {cartRouter};