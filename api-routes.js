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
var productController = require('./controllers/productController');
var userController = require('./controllers/userController');
//product routes
router.get('/products/getPublicProducts',productController.getPublicProducts);
router.get('/products/getPrivateProducts',verify,productController.getPrivateProducts);

router.post('/products/addNewProduct',verify,productController.newProduct);
router.patch('/products/editProductById/:id',verify,productController.editProduct);
router.delete('/products/deleteProductById/:id',verify,productController.deleteProduct);
//user routes
router.get('/user/getUserByEmail',verify, userController.getUserByEmail);
router.post('/user/registerUser', userController.registerUser);
router.patch('/user/editUserById/:id',verify, userController.editUser);
router.patch('/user/deleteUserById/:id',verify, userController.deleteUser);
router.post('/user/loginUser', userController.loginUser);

// Export API routes
module.exports = router;