const productsModel = require('../models/products.model');

const getProduct = async (req, res) => {
    try {
        const { query } = req;
        const result = await productsModel.getProduct(query);
        if(result.rows.length === 0) {
            return res.status(200).json({
                msg: "Product not found",
                data: []
            })
        };
        const meta = await productsModel.getMetaProducts(query);
        res.status(200).json({
            data: result.rows,
            meta,
            msg: "Get product data"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.getSingleProduct(params);
        res.status(200).json({
            data: result.rows,
            msg: "Get products data"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const addProduct = async (req, res) => {
    try {
        const { body } = req;
        const result = await productsModel.addProduct(body);
        res.status(201).json({
            data: result.rows,
            msg: "Success add new product"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const editProduct = async (req, res) => {
    try {
        const { body, params } = req;
        const result = await productsModel.editProduct(body, params);
        res.status(201).json({
            data: result.rows,
            msg: "Success update product"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.getSingleProduct(params)
        await productsModel.deleteProduct(params);
        res.status(201).json({
            data: result.rows,
            msg: "Product deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = {
    addProduct,
    getProduct,
    editProduct,
    deleteProduct,
    getSingleProduct,
};