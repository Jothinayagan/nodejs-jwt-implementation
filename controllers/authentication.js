const userModel = require('../model/user');
const { registerValidation } = require('../script');

const userRegistration = async (req, res) => {

    const isValid = registerValidation(req.body);

    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.status(200).send({ 'user': savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports.registration = userRegistration;