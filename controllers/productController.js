Product = require('../models/productModel');
User = require('../models/userModel');
const {productValidation} = require('../validate');
exports.getProducts = function(req, res){
    Product.find(/* {user:{$ne:req.user._id}} */).populate({
        path: 'seller',
        select: 'userName'
    }).exec(function (err, products){

        if(err){
            res.json({
                status: 'error',
                
                message: err,
                data: null
            });
        
        }
        res.json({
        status: 'success',
        message: 'products retrieved successfully',
        data: products,
        });
            });

}
exports.newProduct = async function(req, res){
    const {error} = productValidation(req.body);
    if(error) return res.status(400).json({status: 'Error', message:error.details[0].message, data: null});
    const user = await User.findOne({_id: req.user._id});
    var newProduct = new Product(req.body);
    console.log(newProduct);
    newProduct.seller = req.user._id;
    const foundProduct = await Product.findOne({seller: req.user._id, productName: newProduct.productName});
    if(user){

      if(!foundProduct){
        newProduct.save(function (err) {

            if (err)
                res.json(err);
            
                Product.findOne(newProduct)
          .populate('seller')
          .exec(function (error, product) {
       
            res.json({
                message: 'New product created!',
                data: product
            });
          });
    
        });
      }else{
        res.json({
            message: 'Product already exists in system. Go to edit page to alter products',
            data: null
        });
      }

    }else{
        res.json({
            message: 'An error occured',
            data: null
        }).status(402);
    }
}
exports.editProduct = async function(req, res){
     if(req.body.stockAmount < 0)
     req.body.stockAmount = 0;
//    return this.deleteProduct();
    var currentUser = await User.findOne({_id: req.user._id});
   
   
   if(currentUser.role == 'admin' || req.body.sellerId ==  req.user._id)

    try {
        var prod  = await Product.findOneAndUpdate({_id:req.params.id},{$set:req.body}, {new: true, upsert: true});
       
    
      
        res.status(200).json(
            {message:"Product Edited",
         data: prod}
             );
      } catch (error) {
          console.log(error);
        res.status(500).json(
            {message:error,
         data: null}
             );;
      }
    else return res.status(401).json(
        {message:'User is not allowed to edit product',
     data: null}
         );
}
exports.deleteProduct = async function(req, res){
    var currentUser = await User.findOne({_id: req.user._id});
   
   if(currentUser.role == 'admin' || req.body.sellerId ==  req.user._id)
    try {
        const product = await Product.findOneAndDelete({_id:req.params.id, });
    
        if (!product) res.status(404).json(
           {message:"No Product found",
        data: null}
            );
        res.status(200).json(
            {message:"Product deleted",
         data: null}
             );
      } catch (error) {
        res.status(500).json(
            {message:error,
         data: null}
             );
      }
      else return res.status(401).json(
        {message:'User is not allowed to delete product',
     data: null}
         );
}
exports.getProductsBySellerId = async function(req, res){
    
   
  
    try {
        const products = await Product.find({seller:req.params.id, });
    
        
        res.status(200).json(
            {message:"Products found",
         data: products}
             );
      } catch (error) {
        res.status(404).json(
            {message:error,
         data: null}
             );
      }
     
}