var mongoose = require('mongoose');
// Setup schema
var cartSchema = mongoose.Schema({
    amount: {
        type:Number,
        default: 0,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
   
});
// Export cart model
var Cart = module.exports = mongoose.model('Cart', cartSchema);
module.exports.get = function (callback, limit) {
    Cart.find(callback).limit(limit);
}