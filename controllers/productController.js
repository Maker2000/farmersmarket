Product = require('../models/productModel');

exports.getProducts = function(req, res){
    Product.get(function (err, products){
if(err){
    res.json({
        status: 'error',
        message: err,
    });

}
res.json({
status: 'success',
message: 'products retrieved successfully',
data: products,
});
    });
}
exports.newProduct = function(req, res){
    var product = new Product();
    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.ownerName = req.body.ownerName;

    product.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New product created!',
            data: product
        });
    });
}