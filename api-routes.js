// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
let verify = require('./verifyToken');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});
var productController = require('./controllers/productController');
var userController = require('./controllers/userController');
router.get('/products/getProducts',verify,productController.getProducts );
router.post('/products/addNewProduct',productController.newProduct);
router.get('/user/getUserByEmail', userController.getUserByEmail);
router.post('/user/registerUser', userController.registerUser);
router.post('/user/loginUser', userController.loginUser);

// Export API routes
module.exports = router;