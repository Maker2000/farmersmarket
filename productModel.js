// productModel.js
const { Double } = require('bson');
var mongoose = require('mongoose');
// Setup schema
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    ownerName: String,
   
});
// Export Contact model
var Contact = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}