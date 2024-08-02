const mongoose = require("mongoose");

const {Schema}= mongoose;

//making brand schema
const brandSchema = new Schema({
     label : {type:String,require:true},
     value : {type: String , require : true},
})

// "label": "smartphones",
// "checked": false,
// "value": "smartphones",
// "id": "1d7e"
const virtualId  = brandSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  brandSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
brandSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

const Brand = mongoose.model('Brand',brandSchema);
module.exports = {Brand};