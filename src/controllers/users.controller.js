const usersModel = require('../models/users.model')

const getUsers = (req, res) => {
    usersModel
        .getUsers()
        .then((result) => {
            res.status(200).json({
                data: result,
            })
        }).catch((err) => {
            res.status(500).json({
                msg: "Internal Server Error",
            })
        })
}

const createUsers = async (req, res) => {
    try {
        const { body } = req
        const result = await usersModel.createUsers(body)
        res.status(201).json({
            data: result.rows,
            msg: "Success create new account"
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const updateUsers = async (req, res) => {
    try {
        const { body } = req
        const result = await usersModel.updateUsers(body)
        res.status(201).json({
            data: result.rows,
            msg: "Account updated"
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const deleteUsers = async (req, res) => {
    try {
        const { body } = req
        const result = await usersModel.deleteUsers(body)
        res.status(201).json({
            data: body,
            msg: "Account deleted"
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
}