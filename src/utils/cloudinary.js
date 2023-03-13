const cloudinary = require('../configs/cloudinary');
const path = require('path')
const datauriParser = require('datauri/parser');

const uploader = async (file, prefix, id) => {
    if (!file) return { data: null };

    const buffer = file.buffer;
    const ext = path.extname(file.originalname).toString();

    const parser = new datauriParser();
    const datauri = parser.format(ext, buffer);
    const fileName = `${prefix}-${file.fieldname}-${id}`;
    try {
        const result = await cloudinary.uploader.upload(datauri.content, {
            public_id: fileName,
            folder: "coffee_shop"
        });
        return { data: result, msg: "OK"};
    } catch (error) {
        return { data: null, msg: "Upload failed"}
    }
}

module.exports = {
    uploader
}