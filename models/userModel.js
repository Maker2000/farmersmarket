const res = require('express/lib/response');
const Strings = require('../strings');
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
}, {_id: false, versionKey: false});

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
    userName:{
        type: String,
        default:'',
        required: true
    },
    age: Number,
    homeAddress: addressSchema,
    role: String,
    selfDescription: {
        type: String,
        default: null
    },
    __v: { type: Number, select: false}
}, {
    toObject:{
    transform: function (doc, ret){
        delete ret.password;
        delete ret.__v;
    },

}, toJSON:{
    transform: function (doc, ret){
        delete ret.password;
        delete ret.__v;
    }
},});

// Export user model
var User = module.exports = mongoose.model(Strings.Collections.User, userSchema);
module.exports.get = function (callback, limit) {

    User.find(callback).limit(limit);
}