const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const authModel = require('../models/auth.model');

const login = async (req, res) => {
    try {
        const { body } = req;
        const result = await authModel.userVerification(body);
        if(result.rows.length === 0) {
            return res.status(401).json({
                msg: "Try with another email/password"
            })
        }
        const { id, created_at, password} = result.rows[0];
        const checkPassword = await bcrypt.compare(body.password, password)
        if(!checkPassword) {
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

module.exports = {
    login
}