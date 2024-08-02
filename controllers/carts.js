const { Cart } = require("../models/cart");

//action to add elemet to the cart
const addToCart = async (req, res) => {
  const {id} = req.user;
  try {
    const cartItem = new Cart({...req.body,user:id});
    console.log(cartItem);
    await cartItem.save();
    const result = cartItem.populate("product");
    res.status(201, "creates").json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const fetchCartItemsById = async (req, res) => {
  try {
   const  {id} = req.user;
    const cartItem = await Cart.find({user:id}).populate('product').exec();
    res.status(200, "success").json(cartItem);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const updateCartItem = async (req, res) => {
  try {
    const {id} = req.params;
    const product = Cart.findByIdAndUpdate(id,req.body,{new:true}).populate('product');
    res.status(200,"success").json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
const deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
  const doc = await Cart.findByIdAndDelete(id);
  res.status(200).json(doc);
} catch (err) {
  res.status(400).json(err);
}
};

// const fetchProductBrands = async(req, res) => {
//   try {
//     const  brands = await Brand.find({}).exec();
//     console.log(brands);
//     res.status(201, "fetched all brands").json(brands);
//   } catch (err) {
//     console.log(err);
//     res.status(400, "error").json(err);
//   }
// };
module.exports = { addToCart ,fetchCartItemsById,updateCartItem,deleteFromCart};
