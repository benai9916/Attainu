const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const PORT = 3000
const app = express()

app.use(bodyParser.json())


const loginDetail = [
    {name: 'tom', password: '123', role: 'admin'},
    {name: 'jerry', password: '123', role: 'user'}
];

const book = [
    {name: "java", author: "javaauhtor"}
]

app.post('/login', (req, res) => {
    const postData = req.body

    if(postData) {
        loginDetail.map((item) => {
            if(postData.name === item.name && postData.password === item.password) {
                const token = jwt.sign(postData, 'tokenSecret', { expiresIn: '5s'})
                const refreshToken = jwt.sign(postData, 'refreshtokenSecret', { expiresIn: '1y'})

                res.send({
                    "token": token,
                    "refreshToken": refreshToken,
                    "role": item.role
                })
            }
        })
    }
})

app.post('/refreshToken', (req, res) => {
    const postData = req.body
    if(postData.refreshToken) {
        jwt.verify(postData.refreshToken, 'refreshtokenSecret', (err, decoded) => {
            if(err) {
                return res.status(401).send({
                    error: 'Unauthorized'
                })
            } else {
                const token = jwt.sign(postData, 'tokenSecret', { expiresIn: '30s'})
                res.send({
                    token: token
                })
            }
        })
    }
})


const verifyToken = (req, res, next) => {
    const token =  req.headers['x-token']

    if(token) {
        jwt.verify(token, 'tokenSecret', (err, decoded) => {
            if(err) {
                return res.status(401).send({
                    error: 'Unauthorized'
                })
            } else {
                req.token = decoded
                next();
            }
        })
    } else {
        return res.status(401).send({
            error: 'Unauthorized'
        })
    }
}


app.get('/book', verifyToken, (req, res) => {
    res.send(book)
})

app.post('/book', verifyToken, (req, res) => {
    const bookData = req.body
    book.push(bookData)
    res.send(book)
})


app.listen(PORT, () => {
    console.log('server is lisetening to port => ', PORT)
})