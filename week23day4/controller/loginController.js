const {userModel } = require('../model/loginModel');

const userLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    console.log(req.body)

    if(!email || !password) {
        return res.status(400).send({err: "please enter all the fields"})
    }

    const isUser = await userModel.findOne({email})

    if(!isUser) {
        return res.status(401).send({err: "wrong email id or password"})
    }

    res.render('home', isUser)
}

module.exports = {
    userLogin
}