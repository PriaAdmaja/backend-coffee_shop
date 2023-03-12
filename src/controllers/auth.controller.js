const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const authModel = require('../models/auth.model');

const login = async (req, res) => {
    try {
        const { body } = req;
        const result = await authModel.userVerification(body);
        if (result.rows.length === 0) {
            return res.status(401).json({
                msg: "Try with another email/password"
            })
        }
        const { id, created_at, password } = result.rows[0];
        const checkPassword = await bcrypt.compare(body.password, password)
        if (!checkPassword) {
            return res.status(401).json({
                msg: "Try with another email/password"
            })
        }

        const payload = {
            id,
            created_at
        }

        const jwtOption = {
            expiresIn: "1h"
        }
        jwt.sign(payload, process.env.JWT_SECRET, jwtOption, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                msg: "Welcome",
                token
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    }

}

const privateAccess = (req, res) => {
    const { id, created_at } = req.authInfo;
    res.status(200).json({
        payload: {
            id,
            created_at
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
        console.log(comparePassword);
    
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

const forgotPassword = () => {
    
}

module.exports = {
    login,
    privateAccess,
    editPassword
}