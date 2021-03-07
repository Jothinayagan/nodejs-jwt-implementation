const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

// Generate authentication token
const generateAuthToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {expiresIn: '1m'});
};

// Authenticate user
const authUser = (req, res, next) => {
    // header is coming with Bearer token
    const authHeader = req.headers['authorization'];

    // split the token from Bearer
    const token = authHeader && authHeader.split(' ')[1];

    // if token is not present send 401 status code
    if (token == null) return res.sendStatus(401);

    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

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
module.exports.generateAuthToken = generateAuthToken;
