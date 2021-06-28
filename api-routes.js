// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
let verify = require('./middleware/verifyToken');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});
//importing controllers 
var productController = require('./controllers/productController');
var userController = require('./controllers/userController');
var cartController = require('./controllers/cartController');
//product routes
router.get('/products/getProducts',productController.getProducts);
router.get('/products/getProductsBySellerId/:id',productController.getProductsBySellerId);
router.post('/products/addNewProduct',verify,productController.newProduct);
router.patch('/products/editProductById/:id',verify,productController.editProduct);
router.delete('/products/deleteProductById/:id',verify,productController.deleteProduct);
//user routes
router.get('/user/getUserById/:id',verify, userController.getUserById);
router.post('/user/registerUser', userController.registerUser);
router.patch('/user/editUserById/:id',verify, userController.editUser);
router.patch('/user/deleteUserById/:id',verify, userController.deleteUser);
router.post('/user/loginUser', userController.loginUser);
//cart routes
router.get('/user/cart/getCart', verify,cartController.getCart);
router.post('/user/cart/addToCart', verify,cartController.addToCart);
// Export API routes
module.exports = router;