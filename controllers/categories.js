const {Category } = require("../models/category");

const fetchProductCategories = async(req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(201, "fetched all categores").json(categories);
  } catch (err) {
    console.log(err);
    res.status(400, "error").json(err);
  }
};
module.exports =  {fetchProductCategories};
