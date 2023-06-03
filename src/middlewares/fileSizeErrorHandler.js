const fileSizeLimitErrorHandler = (err, req, res, next) => {
    if (err) {
        return res.status(413).json({
            msg: 'Use less than 2 MB image size'
        })
    }
    next()
}

module.exports = {fileSizeLimitErrorHandler}