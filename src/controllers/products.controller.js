const productsModel = require('../models/products.model')

const getProduct = async (req, res) => {
    try {
        const result = await productsModel.getProduct()
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

const addProduct = async (req, res) => {
    try {
        const { body } = req;
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
    deleteProduct
}