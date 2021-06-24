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
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    var user = new User(
        {
            name: req.body.name,
            password: hashedPassword,
            email:  req.body.email
        }
    );
    

    user.save(function (err) {
        if (err)
            res.json(err);
    res.json({
            message: 'New user created!',
            data: user
        });
    });
}
