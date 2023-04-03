const promosModel = require('../models/promos.models');

const getPromos = async (req, res) => {
    try {
        const { query } = req;
        const result = await promosModel.getPromos(query);
        if (result.rows.length === 0) {
            return res.status(404).json({
                data: result.rows,
                msg: "Promo not found"
            });
        }
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

const getSinglePromo = async (req, res) => {
    try {
        const { params } = req;
        const result = await promosModel.getSinglePromo(params);
        if (result.rows.length === 0) {
            res.status(404).json({
                data: result.rows,
                msg: "Promo not found"
            });
        }
        res.status(200).json({
            data: result.rows,
            msg: "Get promos data"
        });

    } catch (err) {
        console.log(err);
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
        console.log(err);
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
        const { params } = req;
        const result = await promosModel.getSinglePromo(params);
        await promosModel.deletePromos(params);
        res.status(200).json({
            data: result.rows,
            msg: "Deleting promos data"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = {
    getPromos,
    addPromos,
    editPromos,
    deletePromos,
    getSinglePromo
};