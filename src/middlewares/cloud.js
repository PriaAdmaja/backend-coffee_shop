const { uploader } = require('../utils/cloudinary');
const response = require('../utils/cloudinary')

const cloudUpload = async (req, res, next) => {
    try {
        const result = await uploader(req.file, "Products", req.params.id);
        const { data, err, msg } = result
        if (err) throw { msg: err };  
        if (!data) {
            return next()
        } 
        req.body.pictUrl = data.secure_url
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

module.exports = { cloudUpload }