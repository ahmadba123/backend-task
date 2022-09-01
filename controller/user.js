const user = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const schemaSignup = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    // .email({ tlds: { allow: true } }),
    password: Joi.string().min(8).required(),
});
const schemaSignin = Joi.object({
    email: Joi.string(),
    // .email({ tlds: { allow: true } }),
    password: Joi.string().min(8).required(),
});

class Controller {

getAll(req, res, next) {
    user.find((err, response) => {
        if (err) return next(err);
        res.status(200).send({ success: true, response });
    })
}


async signup(req, res) {
    //validate data entry to new user
    const { error } = schemaSignup.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    //validate if the user is exist or not
    const emailExist = await user.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("the email is exists");
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create a new user
    const users = new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    //add to user to database
    try {
        const newUser = await users.save()
        res.status(200).json({ newUser })
    }
    catch (error) {
        res.status(404).send({ message: error.message })
    }
}

async signin(req, res) {
    const users = await user.findOne({ email: req.body.email })
    //validate data entry to new user
    const { error } = schemaSignin.validate(req.body)
    if (error) return res.status(400).send({ status: 400, message: error.details[0].message })
    //Check if email is exsist
    if (!users) return res.status(400).send({ status: 400, message: 'the email  is wrong' });
    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, users.password)
    if (!validPassword) return res.status(400).send({ status: 400, message: 'the password is wrong' })
    // if all information is true
    // Create a token and assign it to the user
    const token = jwt.sign({ _id: users._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).status(200).send({ status: 200, message: 'success', user: users, Token: token })
}

}
const controller = new Controller();
module.exports = controller;