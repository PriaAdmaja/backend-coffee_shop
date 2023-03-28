const jwt = require('jsonwebtoken');
const redis = require('redis');

const { error } = require('../utils/response');

const checkToken = async(req, res, next) => {
    const bearerToken = req.header("Authorization")
    if(!bearerToken) {
        return error(res, {
            status: '401',
            message: 'Please login with your account'
        })
    };
    const token = bearerToken.split(" ")[1];

    const redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@redis-19327.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:19327`
    });
    redisClient.on('error', err => console.log('Redis client error', err));
    redisClient.on('connect', () => console.log('Redis connected!'));
    await redisClient.connect();
    const blTokenList = await redisClient.get(`bl_${token}`);
    if(blTokenList) {
        return res.status(401).json({
            msg: "Invalid token"
        })
    }
    await redisClient.disconnect();

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