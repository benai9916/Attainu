const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const { urlencoded } = require('body-parser')

const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(urlencoded({ extended: false}))

const verify = (req, res, next) => {
    console.log(req.headers)
    if(req.headers.auth === 'true') {
        next()
    } else {
        res.status(401).send({'error': 'not authorize'})
    }
}

app.post('/api/user', (req, res) => {
    console.log(req.body)
    fs.readFile('data.json', 'utf8', (err, result) => {
        let data = []
        if(!err) {
            if(result) {
                data = JSON.parse(result)
                data.push(req.body)
            } else {
                data.push(req.body)
            }

            fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, saveResult) => {
                if(!err)
                res.send(data)
            })
        } else {
            console.log(err)
        }
    })
})

app.get('/api/user', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            let data = JSON.parse(result)
            res.send(data)
        }
    })
})

app.put('/api/user/:id', verify, (req, res) => {
    let id = Number(req.params.id)
    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            let data = JSON.parse(result)
            data.map((item) => {
                if(item.id === id) {
                    item.username = req.body.username
                    item.password = req.body.password
                }

                res.send(data)
            })
        }
    })
})  

app.delete('/api/user/:id', verify, (req, res) => {
    let id = Number(req.params.id)
    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            let data = JSON.parse(result)
            data.map((item, index) => {
                if(item.id === id) {
                    data.splice(index, 1)
                }
            })

            fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, saveResult) => {
                if(!err)
                res.send(data)
            })
        }
    })
})

app.listen(PORT, () => {
    console.log('server is listening to port => ', PORT)
})