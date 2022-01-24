const mongoose = require('mongoose');

const newImage = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model('Image', newImage);