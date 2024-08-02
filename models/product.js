const mongoose = require("mongoose");

const {Schema}= mongoose;

//making product schema
const productSchema = new Schema({
     title : {type:String,require:true},
     description : {type:String,require:true},
     category : {type:String,require:true},
     price : {type:Number,require:true},
     rating : {type:Number,require:true},
     stock : {type:String,require:true},
     brand:{type:String,require:true},
     images:{type:[String],require:true},
     thumbnail : {type:String,require:true},
     deleted : {type:Boolean,default:false}
})

const virtualId  = productSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

const Product = mongoose.model('Product',productSchema);
module.exports = {Product};
// {
//     "id": "1",
//     "title": "Essence Mascara Lash Princess",
//     "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//     "category": "beauty",
//     "price": "89",
//     "discountPercentage": 7.17,
//     "rating": 4.94,
//     "stock": 5,
//     "tags": [
//       "beauty",
//       "mascara"
//     ],
//     "brand": "Essence",
//     "sku": "RCH45Q1A",
//     "weight": 2,
//     "dimensions": {
//       "width": 23.17,
//       "height": 14.43,
//       "depth": 28.01
//     },
//     "warrantyInformation": "1 month warranty",
//     "shippingInformation": "Ships in 1 month",
//     "availabilityStatus": "Low Stock",
//     "reviews": [
//       {
//         "rating": 2,
//         "comment": "Very unhappy with my purchase!",
//         "date": "2024-05-23T08:56:21.618Z",
//         "reviewerName": "John Doe",
//         "reviewerEmail": "john.doe@x.dummyjson.com"
//       },
//       {
//         "rating": 2,
//         "comment": "Not as described!",
//         "date": "2024-05-23T08:56:21.618Z",
//         "reviewerName": "Nolan Gonzalez",
//         "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
//       },
//       {
//         "rating": 5,
//         "comment": "Very satisfied!",
//         "date": "2024-05-23T08:56:21.618Z",
//         "reviewerName": "Scarlett Wright",
//         "reviewerEmail": "scarlett.wright@x.dummyjson.com"
//       }
//     ],
//     "returnPolicy": "30 days return policy",
//     "minimumOrderQuantity": 24,
//     "meta": {
//       "createdAt": "2024-05-23T08:56:21.618Z",
//       "updatedAt": "2024-05-23T08:56:21.618Z",
//       "barcode": "9164035109868",
//       "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
//     },
//     "images": [
//       "efwefw",
//       "sddddddddddddddddd",
//       "kkn"
//     ],
//     "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
//     "deleted": true
//   }