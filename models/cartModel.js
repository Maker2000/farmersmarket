var mongoose = require('mongoose');
const Strings = require('../strings');
// Setup schema
var cartItemSchema = mongoose.Schema({
    amount: {
        type:Number,
        default: 0,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Strings.Collections.Product
    },
    __v: { type: Number, select: false}
}, {_id: false,});
var cartSchema = mongoose.Schema({
    cartItem: [cartItemSchema],
    buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Strings.Collections.User
    },
    __v: { type: Number, select: false}
},);
// Export cart model
var Cart = module.exports = mongoose.model(Strings.Collections.Cart, cartSchema);
module.exports.get = function (callback, limit) {
    Cart.find(callback).limit(limit);
}