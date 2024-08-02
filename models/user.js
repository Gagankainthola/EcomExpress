const mongoose = require('mongoose');
const { Schema, Mixed } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, default: 'user' },
  address: { type: [Mixed], required: true },
  name: { type: String,},
  salt: Buffer,
  orders: { type: [Mixed] },
});
const virtualId  = userSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  userSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})
const User = mongoose.model('User', userSchema);

module.exports = {User};
