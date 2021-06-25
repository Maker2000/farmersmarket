
const Cart = require('../models/cartModel');
exports.getCart = async function(req, res){
    await Cart.findOne({buyer:req.user._id}).populate('cartItem.product').exec(function(error, cartItems){
        if(error){
            res.json({
                status: 'error',
                
                message: err,
                data: null
            });
        
        }
        res.json({
        status: 'success',
        message: 'cart retrieved successfully',
        data: cartItems,
        });
    });
}
exports.addToCart = async function(req, res){
    
    var existingCartUser = await Cart.findOne({buyer: req.user._id});

    if(existingCartUser)
    {   
        
        var existingCartItem = await Cart.findOne({buyer: req.user._id, 'cartItem.product': req.body.product});
       
       
        if(existingCartItem)
        try {
            //console.log(existingCartItem);
           // req.body.buyer = req.user._id;
            var ctItem = await Cart.findOneAndUpdate({buyer: req.user._id, "cartItem.product":req.body.product },{$set: {"cartItem.$.amount":existingCartItem.cartItem.find(item=>item.product == req.body.product._id).amount+req.body.amount}}, {new: true, upsert: true});
            res.json({
                status: 'success',
                message: 'Product added to cart successfully',
                data: ctItem,
                });
        } catch (error) {
            res.json({
                status: 'error',
                
                message: error,
                data: null
            });
        }
        else{
            try {

                existingCartUser.cartItem.push(req.body);
                var ctItem = await existingCartUser.save();
                console.log(ctItem);
                res.json({
                    status: 'success',
                    message: 'Product added to cart successfully',
                    data: ctItem,
                    });
            } catch (error) {
                res.json({
                    status: 'error',
                    
                    message: error,
                    data: null
                });
            }
        }
        
    }
    else{
        try {
            req.body.buyer = req.user._id;
            var cartItem = await new Cart(req.body).save();
            res.json({
                status: 'success',
                message: 'Product added to cart successfully',
                data: cartItem,
                });
        } catch (error) {
            res.json({
                status: 'error',
                
                message: error,
                data: null
            });
        }
    }
    
}
  

