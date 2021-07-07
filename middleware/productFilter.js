const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        req.user = undefined;
        next();
        return;
    }
  
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
       
        
        req.user = verified;
        next();
    } catch (error) {
        return  res.status(400).json({
            message: 'Invalid Token',
            data: null
        });
    }
}