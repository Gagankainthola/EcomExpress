const express = require('express');

const {createOrder, fetchAllOrders, updateOrder} = require("../controllers/orders");
const { fetchUserOrders } = require('../controllers/users');

const ordersRouter = express.Router();

ordersRouter.post("/",createOrder).patch("/:id",updateOrder).get("/",fetchAllOrders).get("/:id",fetchUserOrders);

module.exports = {ordersRouter};