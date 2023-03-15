const multer = require('multer');
const path = require('path');

const error = require('../utils/response')

const storage = multer.memoryStorage()
const limits = 2e6;

const fileFilter = (req, file, cb) => {
    const pattern = /jpg|png|webp/i;
    const ext = path.extname(file.originalname);
    if (!pattern.test(ext)) {
        // error(ext, {status: 422, message: "Wrong file extension" });
        cb(null, false)
        return
    } 
    cb(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter
})

module.exports = upload;