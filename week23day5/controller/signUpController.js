const signUpModel = require('../model/signUpModel');
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    const {username, email, password, confPaaword, phone} = req.body

    console.log("detail ==",username, email, password, confPaaword, phone)


    if(!username || !email || !password , !confPaaword, !phone) {
        res.status(400).send({err: "please enter all the fields"})
    }

    if(password !== confPaaword) {
        res.status(400).send({err: "password does not match"})
    }

    const user = await signUpModel.findOne({email})
    console.log("===usedr",user)
    if(user) {
        res.send({err: 'user already exists'})
    }

    const data = new signUpModel({
        username: username,
        email: email,
        password: password,
        phone: phone
    })

    const ress = await data.save()

    const token = jwt.sign({email: email},  'strong', {expiresIn: '1h'})

    res.send(token)
}

module.exports = signUp