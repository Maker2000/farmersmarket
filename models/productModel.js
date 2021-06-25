// productModel.js

var mongoose = require('mongoose');
// Setup schema
const Strings = require('../strings');

var productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
       
    },
    price: {
        type: Number,
        required: true
    },
    stockAmount: {
        type:Number,
        default: 0,
    },
    seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Strings.Collections.User
    },
   
});
// Export Product model
var Product = module.exports = mongoose.model(Strings.Collections.Product, productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}