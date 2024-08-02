const mongoose = require("mongoose");

const {Schema}= mongoose;

//making cart schema
const cartSchema = new Schema({
     product : { type: Schema.Types.ObjectId, ref: 'Product',require:true },
     user : { type: Schema.Types.ObjectId, ref: 'User',require:true},
     quantity : {type : Number,}
})

// "label": "smartphones",
// "checked": false,
// "value": "smartphones",
// "id": "1d7e"
const virtualId  = cartSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  cartSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

const Cart = mongoose.model('Cart',cartSchema);
module.exports = {Cart};