const res = require('express/lib/response');
var mongoose = require('mongoose');
var addressSchema = mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2:{
        default: null,
        type: String,
    },
    city: {
        default: null,
        type: String,
    },
    parish:{
        default: null,
        type: String,
    },
}, {_id: false});

// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
   
    password: {
        type: String,
        trim: true,
        required: true,
        
    },
    age: Number,
    homeAddress: addressSchema,
    role: String,
    selfDescription: String
}, {
    toObject:{
    transform: function (doc, ret){
        delete ret.password;
    },

}, toJSON:{
    transform: function (doc, ret){
        delete ret.password;
    }
},});

// Export user model
var User = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {

    User.find(callback).limit(limit);
}