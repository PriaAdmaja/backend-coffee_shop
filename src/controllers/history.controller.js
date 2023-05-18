const historyModel = require('../models/history.model');

const getHistory = async (req, res) => {
    try {
        const { query, params } = req;
        const result = await historyModel.getHistory(params, query);
        if (result.rows.length === 0) {
            return res.status(404).json({
                data: result.rows,
                msg: "Data not found"
            });
        }
        res.status(200).json({
            data: result.rows,
            msg: "Get history data"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const getAllHistory = async (req, res) => {
    try {
        const { query } = req;
        const result = await historyModel.getAllHistory(query);
        res.status(200).json({
            data: result.rows,
            msg: "Get history data"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const addHistory = async (req, res) => {
    try {
        const { body } = req;
        const result = await historyModel.addHistory(body);
        res.status(201).json({
            data: result.rows,
            msg: "Success add new history"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const editHistory = async (req, res) => {
    try {
        const { body } = req;
        const result = await historyModel.editHistory(body);
        res.status(201).json({
            data: result.rows,
            msg: "Success update history"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const deleteHistory = async (req, res) => {
    try {
        const { body } = req;
        const result = await historyModel.deleteHistory(body);
        res.status(201).json({
            data: result.rows,
            msg: "History deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = {
    getHistory,
    addHistory,
    editHistory,
    deleteHistory,
    getAllHistory
};