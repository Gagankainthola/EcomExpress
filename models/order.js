const mongoose = require("mongoose");
const {Schema,Mixed} = mongoose;


const orderSchema = new Schema({
       products: {type:[Mixed],require:true},
       user : {type : Schema.Types.ObjectId,ref:'User', require:true},
       paymentMethod:{type:String,require:true},
       selectedAddress:{type:Mixed,require:true},
       status : {type : String,default:"pending"},
       total : {type:Number,require:true}
})

const virtualId  = orderSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  cartSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
orderSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

const Order = mongoose.model('Order',orderSchema);

module.exports = {Order};
