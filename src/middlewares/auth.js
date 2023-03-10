const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    const bearerToken = req.header("Authorization")
    if(!bearerToken) {
        return res.status(401).json({
            msg: "Please login with your account"
        });
    };
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err && err.name) {
            return res.status(403).json({
                msg: err.message
            })
        }
        if (err) {
            return res.status(500).json({
                msg: "Internal server error"
            })
        }
        req.authInfo = payload;
        next()
    });
};

module.exports = {
    checkToken
}