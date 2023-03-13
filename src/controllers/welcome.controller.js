const path = require("path");
const { uploader } = require('../utils/cloudinary');
const response = require('../utils/cloudinary')

const welcomePage = (req, res) => {
    res.json({
        msg: "Welcome to Coffee Shop server"
    });
};

const cloudUpload = async (req, res) => {
    try {
        const { data, err, msg} = await uploader(req, "Welcome", 1);
        if(err) throw {msg: err};
        if(!data) return res.status(200).json({ msg: "No file uploaded"});
        res.status(201).json({data, msg})
    } catch (error) {
        response.error(res, {status: 500, msg: err.msg})
    }
}

module.exports = {welcomePage, cloudUpload}