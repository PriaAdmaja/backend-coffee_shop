const usersModel = require('../models/users.model');

const getUsers = (req, res) => {
    const { query } = req;
    usersModel
        .getUsers(query)
        .then((result) => {
            res.status(200).json({
                data: result.rows,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "Internal Server Error",
            });
        });
};

const findUsers = async (req, res) => {
    try {
        const { params } = req;
        const result = await usersModel.findUsers(params);
        if (result.rows.length === 0) {
            res.status(404).json({
                data: result.rows,
                msg: "Data not found"
            });
        } else {
            res.status(200).json({
                data: result.rows,
                msg: "Get users data"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};

const createUsers = async (req, res) => {
    try {
        const { body } = req;
        const result = await usersModel.createUsers(body);
        res.status(201).json({
            data: result.rows,
            msg: "Success create new account"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const updateUsers = async (req, res) => {
    try {
        const { body } = req;
        const result = await usersModel.updateUsers(body);
        res.status(201).json({
            data: result.rows,
            msg: "Account updated"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const { body } = req;
        const result = await usersModel.deleteUsers(body);
        res.status(201).json({
            data: result.rows,
            msg: "Account deleted"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
    findUsers
};