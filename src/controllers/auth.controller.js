const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('redis');
const db = require('../configs/db');
const redisClient = require('../configs/redis')
const nodemailer = require("nodemailer")

const authModel = require('../models/auth.model');
const usersModel = require('../models/users.model');
const { error } = require('../utils/response');


const login = async (req, res) => {
    try {
        const { body } = req;
        if (!body.email && !body.password) {
            return res.status(401).json({
                msg: "Input your email & password"
            })
        }
        const result = await authModel.userVerification(body);
        if (result.rows.length === 0) {
            return res.status(401).json({
                msg: "Try with another email/password"
            })
        }
        const { id, created_at, roles_id, password, pict_url } = result.rows[0];
        const checkPassword = await bcrypt.compare(body.password, password)
        if (!checkPassword) {
            return res.status(401).json({
                msg: "Try with another email/password"
            })
        }

        const payload = {
            id,
            created_at,
            roles_id
        }

        const jwtOption = {
            expiresIn: "1h"
        }
        jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                msg: "Welcome",
                profilePict: pict_url,
                token,
                roles_id,
                id
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}

const register = async (req, res) => {
    const { body } = req;
    try {
        if (!body.email || !body.password || !body.phoneNumber) {
            return res.status(401).json({
                msg: "Incomplete register form data"
            })
        }
        const result = await authModel.checkUsers(body);
        if (result.rows[0]) {
            return res.status(200).json({
                msg: "Email already exist"
            })
        }
        const encryptedPassword = await bcrypt.hash(body.password, 10)
        const newUsers = await usersModel.createUsers(body.email, encryptedPassword, body.phoneNumber)
        res.status(200).json({
            data: newUsers.rows,
            msg: "Success create new user"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })

    }
}

const logout = async (req, res) => {
    try {
        redisClient.on('error', err => console.log('Redis client error', err));
        await redisClient.connect();
        const { authInfo, token } = req;
        const tokenKey = `bl_${token}`;
        await redisClient.set(tokenKey, token);
        await redisClient.expireAt(tokenKey, authInfo.exp);
        await redisClient.disconnect();
        return res.status(200).json({
            msg: 'Token invalidated'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}

const privateAccess = (req, res) => {
    const { id, created_at, roles_id } = req.authInfo;
    res.status(200).json({
        payload: {
            id,
            created_at,
            roles_id
        },
        msg: "OK"
    })
}

const editPassword = async (req, res) => {
    const { body, authInfo } = req;
    try {
        const result = await authModel.getPassword(authInfo.id);
        const passDb = result.rows[0].password;
        const comparePassword = await bcrypt.compare(body.oldPassword, passDb);
        if (!comparePassword) {
            return res.status(403).json({
                msg: "Wrong password"
            })
        }
        const encryptedPassword = await bcrypt.hash(body.newPassword, 10);
        await authModel.editPassword(encryptedPassword, authInfo.id);
        res.status(200).json({
            msg: "Success edit password"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })

    }
}

const forgotPassword = async (req, res) => {
    const { params } = req;
    const char = `0987654321`
    let otp = ``
    for (let i = 0; i < 5; i++) {
        otp += char[Math.floor(Math.random() * char.length)]
    }
    try {
        const result = await authModel.createOtp(params.email, otp);
        if (result.rows.length === 0) {
            return res.status(404).json({
                msg: "Email not found"
            })
        }
        res.status(200).json({
            msg: "Check your mail"
        })
        console.log(`email: ${params.email}`);
        console.log(`otp: ${result.rows[0].otp}`);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const verifyOtp = async (req, res) => {
    const { body } = req;
    const client = await db.connect()
    try {
        await client.query("BEGIN");
        const result = await authModel.checkOtp(body.email);
        if (body.otp !== result.rows[0].otp) {
            return res.status(404).json({
                msg: "Invalid code"
            })
        }
        const encryptedPassword = await bcrypt.hash(body.newPassword, 10)
        await authModel.setNewPassword(encryptedPassword, body.email);
        await client.query("COMMIT");
        res.status(200).json({
            msg: "Set new password"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    } finally {
        client.release()
    }
}

const verifyToken = async (req, res) => {
    try {
        const bearerToken = req.header("Authorization")
        if (!bearerToken) {
            return error(res, {
                status: '401',
                message: 'Please login with your account'
            })
        };
        const token = bearerToken.split(" ")[1];
        redisClient.on('error', err => console.log('Redis client error', err));
        redisClient.on('connect', () => console.log('Redis connected!'));
        await redisClient.connect();
        const blTokenList = await redisClient.get(`bl_${token}`);
        if (blTokenList) {
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
            res.status(200).json({
                msg: "OK"
            })
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
};


module.exports = {
    login,
    privateAccess,
    editPassword,
    forgotPassword,
    verifyOtp,
    register,
    logout,
    verifyToken
}