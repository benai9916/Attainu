const mongoose = require('mongoose')

const signUpModel = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: Number
})

module.exports = mongoose.model('signup', signUpModel)