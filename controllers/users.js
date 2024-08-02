const { User } = require("../models/user");
const {Order} = require("../models/order");


const fetchUserById = async (req, res) => {
  const { id } = req.user;
  console.log(id)
  try {
    const user = await User.findById(id);
    res.status(200).json({id:user.id,address:user.address,email:user.email,role:user.role});
  } catch (err) {
    res.status(400).json(err);
  }
};

//create user//this one will be moved in the auth apis soon
const fetchUserOrders = async (req, res) => {
  try {
     const {id} = req.params;
     const orders = await Order.find({usser:id});
    res.status(200, "succes").json(orders);
  } catch (err) {
    res.status(401, "faile").json(err);
  }
};
module.exports = {fetchUserOrders,fetchUserById};
