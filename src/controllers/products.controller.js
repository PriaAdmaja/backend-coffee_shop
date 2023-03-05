const productsModel = require('../models/products.model')

const getProduct = async (req, res) => {
    try {
        const { query } = req
        const result = await productsModel.getProduct(query)
        res.status(200).json({
            data: result.rows,
            msg: "Get products data"
        })
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const findProduct = async (req, res) => {
    try {
        const { query } = req
        const result = await productsModel.findProduct(query)
        if (result.rows.length === 0) {
            res.status(404).json({
                data: result.rows,
                msg: "Data not found"
            })
        } else {
            res.status(200).json({
                data: result.rows,
                msg: "Get products data"
            })
        }
           
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const { body } = req
        const result = await productsModel.addProduct(body)
        res.status(201).json({
            data: result.rows,
            msg: "Success add new product"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const editProduct = async (req, res) => {
    try {
        const { body } = req;
        const result = await productsModel.editProduct(body)
        res.status(201).json({
            data: result.rows,
            msg: "Success update product"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { body } = req;
        const result = await productsModel.deleteProduct(body)
        res.status(201).json({
            data: body,
            msg: "Product deleted"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

module.exports = {
    addProduct,
    getProduct,
    editProduct,
    deleteProduct,
    findProduct
}