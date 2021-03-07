const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

// Authenticate user
const authUser = (req, res, next) => {
    // header is coming with Bearer token
    const authHeader = req.headers['authorization'];
    
    // split the token from Bearer
    const token = authHeader && authHeader.split(' ')[1];

    // if token is not present send 401 status code
    if (token == null) return res.status(401).send('Access Denied');

    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('No access')

        req.user = 'verified';
        next();
    })

};

// User registration validation 
const registerValidation = (data) => {

    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

// User login validation
const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.authUser = authUser;