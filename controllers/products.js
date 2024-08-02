const { Product } = require("../models/product");

const createProduct = async(req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201, "creates").json(product);
  } catch (err) {
    console.log(err);
    res.status(400, "error").json(err);
  }
};
const fetchAllProductsFilter = async (req, res) => {
   try {
     // Start with the base query
     let query = Product.find({});
     //we have to duplicate this query for headers
     let totalDocs = Product.find({});
     // Apply filtering based on query parameters
     if (req.query.category) {
       query = query.where('category').equals(req.query.category);
       totalDocs = totalDocs.where('category').equals(req.query.category);
     }
     if (req.query.brand) {
       query = query.where('brand').equals(req.query.brand);
       totalDocs = totalDocs.where('brand').equals(req.query.brand);
     }
 
     // Apply sorting if _sort and order are present
     if (req.query._sort && req.query._order) {
       const sortDirection = req.query._order === 'asc' ? 1 : -1;
       query = query.sort({ [req.query._sort]: sortDirection });
       totalDocs = totalDocs.sort({ [req.query._sort]: sortDirection });
     }
 
     // Apply pagination if _page and _limit are present
     if (req.query._page && req.query._limit) {
       const pageSize = parseInt(req.query._limit, 10);
       const page = parseInt(req.query._page, 10);
       query = query.skip(pageSize * (page - 1)).limit(pageSize);
       totalDocs = totalDocs.skip(pageSize * (page - 1)).limit(pageSize);
     }
    
     //set the headers
    totalDocs = totalDocs.countDocuments();
     const ans = await totalDocs.exec();
     res.set('X-Total-Count',ans);
     // Execute the query
     const products = await query.exec();
     res.status(200).json(products);
   } catch (err) {
     console.error(err);
     res.status(400).json({ error: err.message });
   }
 };

 //api to fetchProduct by id
const fetchProductById = async(req,res)=>{
    try{
      const {id} = req.params;
       const product = await Product.findById(id).exec();
       res.status(200,"success").json(product);
    }catch(err){
      res.status(400,"error").json(err);
    } 
}; 

//api to update product
const editProductById = async(req,res)=>{
  try{
    const {id} = req.params;
     const product = await Product.findByIdAndUpdate(id,req.body,{new:true}).exec();
     res.status(200,"success").json(product);
  }catch(err){
    console.log(err);
    res.status(400,"error").json(err);
  } 
}; 
 
module.exports = { createProduct ,fetchAllProductsFilter,fetchProductById,editProductById};
