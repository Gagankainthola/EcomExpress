const { Order} = require("../models/order");

//action to add elemet to the cart
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    console.log(order);
    res.status(201, "creates").json(order);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().exec();
    res.status(200, "success").json(orders);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const updateOrder = async (req, res) => {
  try {
     const {id} = req.params;
     console.log(id);
     const order = await Order.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200, "success").json(order);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports = {createOrder,fetchAllOrders,updateOrder};
