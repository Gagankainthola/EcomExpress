const {Brand} = require("../models/brand");

const fetchProductBrands = async(req, res) => {
  try {
    const  brands = await Brand.find({}).exec();
    res.status(201, "fetched all brands").json(brands);
  } catch (err) {
    console.log(err);
    res.status(400, "error").json(err);
  }
};
module.exports = {fetchProductBrands};