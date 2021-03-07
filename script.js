const joi = require('@hapi/joi');
const { schema } = require('./model/user');

// User registration validation 

const registerValidation = (data) => {

    const schema = {
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }

    joi.validate(data, schema);
}

// User login validation

module.exports.registerValidation = registerValidation;