User = require('../models/userModel');
const {registerValidation, loginValidation} = require('../validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUserByEmail = function(req, res){
    console.log(req.body);
    User.get(function (err, user){
        if(err){
            res.json({
                status: 'error',
                message: err,
        });

        }
        res.json({
        status: 'success',
        message: 'user retrieved successfully',
        data: user,
        });
    });
}
exports.loginUser = async function(req, res){
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json(error.details);
    const user = await User.findOne({email: req.body.email});
    if(!user)
    return res.status(400).json({
        message: 'email or password is wrong',
        data: null
    });
    //checking passwrod
    const valiPassword = await bcrypt.compare(req.body.password, user.password);
    if(!valiPassword)
    return res.status(400).send({
        message: 'email or password is wrong',
        data: null
    });
    //creating token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    return res.header('auth-token', token).status(200).json({
        message: 'User found',
        data: user
    });
    
};
exports.registerUser = async function (req, res) {

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json(error.details);
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists)
    return res.status(400).send({
        message: 'User already exists!',
        data: null
    });
    const salt = await bcrypt.genSalt(15);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    console.log(req.body);
    var user = new User(req.body);
    
    

    user.save(function (err, newUser) {
        if (err)
            res.json(err);
            const token = jwt.sign({_id: newUser._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).status(200).json({
            message: 'New user created!',
            data: newUser
        });
    
    });
}
exports.editUser = async function(req,res){
    var currentUser = await User.findOne({_id: req.user._id});
   
    if(currentUser.role == 'admin' || req.params.id == req.user._id)
 
     try {
         var editedUser  = await User.findOneAndUpdate({_id:req.params.id},{$set:req.body}, {new: true, upsert: true});
        
     
       
         res.status(200).json(
             {message:"User Edited",
          data: editedUser}
              );
       } catch (error) {
           console.log(error);
         res.status(500).json(
             {message:error,
          data: null}
              );;
       }
     else return res.status(401).json(
         {message:'User is not allowed to edit user',
      data: null}
          );
}
exports.deleteUser = async function(req,res){
    var currentUser = await User.findOne({_id: req.user._id});   
    if(currentUser.role == 'admin' || req.params.id == req.user._id)
     try {
         const editedUser = await User.findOneAndDelete({_id:req.params.id, });
     
         if (!editedUser) res.status(404).json(
            {message:"No User found",
         data: null}
             );
         res.status(200).json(
             {message:"User deleted",
          data: null}
              );
       } catch (error) {
         res.status(500).json(
             {message:error,
          data: null}
              );
       }
       else return res.status(401).json(
         {message:'User is not allowed to delete user',
      data: null}
          );
}
