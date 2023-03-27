const jwt = require('jsonwebtoken')
const redisClient = require('redis').createClient();
const { error } = require('../utils/response')

const checkToken = async(req, res, next) => {
    const bearerToken = req.header("Authorization")
    if(!bearerToken) {
        return error(res, {
            status: '401',
            message: 'Please login with your account'
        })
    };

    const token = bearerToken.split(" ")[1];
    const blTokenList = await redisClient.get(`bl_${token}`);
    if(blTokenList) {
        return res.status(401).json({
            msg: "Invalid token"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err && err.name) {
            return error(res, {
                status: 403,
                message: err.message
            })
        }
        if (err) {
            return error(res, {
                status: 500,
                message: 'Internal server error'
            })
        }

        req.authInfo = payload;
        req.token = token;
        next()
    });
};

const checkTokenAdmin = (req, res, next) => {
    const bearerToken = req.header("Authorization")
    if(!bearerToken) {
        return error(res, {
            status: 401,
            message: 'Please login with your account'
        })
    };
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err && err.name) {
            return error(res, {
                status: 403,
                message: err.message
            })
        }
        if (err) {
            return error(res, {
                status: 500,
                message: 'Internal server error'
            })
        }
        if (payload.roles_id !== 2) {
            return error(res, {
                status: 403,
                message: 'Permission denied'
            })
        }
        req.authInfo = payload;
        next()
    });
}

// const checkAdmin = (req, res, next) => {
//     const { roles_id} = req.authInfo
//     if (roles_id !== 2) {
//         return error(res, {
//             status: 403,
//             message: 'Permission denied'
//         })
//     }
//     next()
// }

module.exports = {
    checkToken,
    checkTokenAdmin,
}