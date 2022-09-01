const jwt = require("jsonwebtoken");
const User = require('../model/user');

const auth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = await User.findById(decoded._id);
            if (!req.user) {
                return res.status(401).send({ error: "not authorized" });
            }
            next();
        } catch (error) {
            return res.status(401).send({ error: "not authorized" });
        }
    }

    if (!token) {
        return res.status(401).send({ error: "not authorized" });
    }
};


module.exports = { auth };