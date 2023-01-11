Product = require('../models/productModel');
User = require('../models/userModel');
const {productValidation} = require('../validate');
exports.getProducts = function(req, res){
    console.log(req.user);
    if(req.user)
    Product.find({seller:{$ne:req.user._id}}).populate({
        path: 'seller',
        select: 'userName'
    }).exec(function (err, products){

        if(err){
            return res.json({
                status: 'error',
                
                message: err,
                data: null
            });
        
        }
        return res.json({
        status: 'success',
        message: 'products retrieved successfully',
        data: products,
        });
            });
        else  
        Product.find().populate({
            path: 'seller',
            select: 'userName'
        }).exec(function (err, products){
    
            if(err){
                return res.json({
                    status: 'error',
                    
                    message: err,
                    data: null
                });
            
            }
            return res.status(200).json({
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
    newProduct.seller = req.user._id;
    const foundProduct = await Product.findOne({seller: req.user._id, productName: newProduct.productName});
    if(user){
       
      if(!foundProduct){
        
        newProduct.save(function (err, prod) {
            
            if (err)
                return res.json(err);
            
                Product.findOne({_id:prod._id})
          .populate('seller','userName')
          .exec(function (error, returnedProduct) {
              
            if(error)
          return res.json({
                message: 'an error occured',
                data: null
            }).status(402);
       return res.json({
                message: 'New product created!',
                data: returnedProduct
            }).status(200);
          });
    
        });
      }else{
       return res.status(403).json({
            message: 'Product already exists in system. Go to edit page to alter products',
            data: null
        });
      }

    }else{
        return res.status(402).json({
            message: 'An error occured',
            data: null
        });
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
       
    
      
       return res.status(200).json(
            {message:"Product Edited",
         data: prod}
             );
      } catch (error) {
          console.log(error);
     return   res.status(500).json(
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
    
        if (!product) return res.status(404).json(
           {message:"No Product found",
        data: null}
            );
       return res.status(200).json(
            {message:"Product deleted",
         data: null}
             );
      } catch (error) {
       return res.status(500).json(
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
        const products = await Product.find({seller:req.params.id, }).populate({path: 'seller', select: '_id userName'});
    
        
       return res.status(200).json(
            {message:"Products found",
         data: products}
             );
      } catch (error) {
     return   res.status(404).json(
            {message:error,
         data: null}
             );
      }
     
}