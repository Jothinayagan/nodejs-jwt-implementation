const userModel = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../script');

const userRegistration = async (req, res) => {

    // valid user data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking user is already exists
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send('User already exist!');

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.status(200).send({ 'user': savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
};

const userLogin = async (req, res) => {

    // valid user data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking user is already exists
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Email does not exist!`);

    // validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Incorrect password!');

    // create and sign JSON web token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.status(200).header('auth-token', token).send(token);
}

module.exports = { userRegistration: userRegistration, userLogin: userLogin };