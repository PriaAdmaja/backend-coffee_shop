const errorModel = require('../models/error.model');

const createError = (req, res) => {
    errorModel.logError({
        status: req.body.status,
        message: req.body.message
    },
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    msg: err.message
                })
            }
            res.status(200).json({
                msg: result.message
            })
        }
    )
}

const getError = (req, res) => {
    errorModel.getError((err, result) => {
        if(err) {
            return res.status(500).json({
                msg: err.message
            })
        }
        res.status(200).json({
            data: result,
        })
    })
}

module.exports = {
    createError,
    getError
}