const promosModel = require('../models/promos.models');

const getPromos = async (req, res) => {
    try {
        const { query } = req;
        const result = await promosModel.getPromos(query);
        res.status(200).json({
            data: result.rows,
            msg: "Get promos data"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const addPromos = async (req, res) => {
    try {
        const { body } = req;
        const result = await promosModel.addPromos(body);
        res.status(200).json({
            data: result.rows,
            msg: "Add new promos data"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const editPromos = async (req, res) => {
    try {
        const { body } = req;
        const result = await promosModel.editPromos(body);
        res.status(200).json({
            data: result.rows,
            msg: "Editing promos data"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const deletePromos = async (req, res) => {
    try {
        const { body } = req;
        const result = await promosModel.deletePromos(body);
        res.status(200).json({
            data: result.rows,
            msg: "Deleting promos data"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = {
    getPromos,
    addPromos,
    editPromos,
    deletePromos
};