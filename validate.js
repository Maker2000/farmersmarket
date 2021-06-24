const Joi = require('@hapi/joi');

const registerValidation = (data) =>{

    const addressSchema = Joi.object({
        addressLine1: Joi.string().required(),
        addressLine2:Joi.string(),
        city: Joi.string(),
        parish:Joi.string(),
    });
    const userSchema = Joi.object({
    
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        age: Joi.number(),
        homeAddress: addressSchema,
        role: Joi.string().required().valid('user', 'admin'),
    });
    return userSchema.validate(data);
}
const loginValidation = (data) =>{
    const schema = Joi.object({
       
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    });
    return schema.validate(data);
}
const productValidation = (data) =>{
    const schema = Joi.object({
        productName: Joi.string().required().valid('Yam', 'Banana', "Pear"),
        price: Joi.number().required(),
        stockAmount: Joi.number(),
    });
    return schema.validate(data);
}

 module.exports.registerValidation = registerValidation;
 module.exports.loginValidation = loginValidation;
 module.exports.productValidation = productValidation;