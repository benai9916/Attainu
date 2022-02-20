const mongoose = require('mongoose')

const users = new mongoose.Schema({
    email: String,
    password: String
})

let userModel = mongoose.model('user', users)

module.exports = {
    userModel
}