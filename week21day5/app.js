const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')


const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/product', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
        let data = []
        if(!err) {
            if(result) {
                data = JSON.parse(result)
                data.push(req.body)
            } else {
                data.push(req.body)
            }

            fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, savedResult) => {
                if(!err)
                console.log('data saved')
                res.send(data)
            })
        }
    })
})


app.get('/api/product', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            if(result) {
                let data = JSON.parse(result)
                res.send(data)
            } else {
                res.json({error: "No data"})
            }
        }
    })
})

app.get('/api/product/:id', (req, res) => {
    let id = Number(req.params.id)

    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            if(result) {
                let data = JSON.parse(result)

                data.map((items) => {
                    if(items.id === id) {
                        res.send(items)
                    }
                })
            } else {
                res.json({error: "No data"})
            }
        }
    })
})

app.put('/api/product/:id', (req, res) => {
    let id = Number(req.params.id)
    
    fs.readFile('data.json', 'utf8', (err, result) => {
        let data = []
        if(!err) {
            if(result) {
                data = JSON.parse(result)

                data.map((items) => {
                    if(items.id === id) {
                        items.name = req.body.name
                        items.description = req.body.description
                    }
                })

                fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, savedResult) => {
                    if(!err)
                    console.log('data saved')
                    res.send(data)
                })

            } else {
                res.json({error: "No data with product id -> ", id})
            }
        }
    })
})

app.delete('/api/product/:id', (req, res) => {
    let id = Number(req.params.id)

    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            if(result) {
                let data = JSON.parse(result)

                data.map((items, index) => {
                    if(items.id === id) {
                        data.splice(index, 1)
                    }
                })

                fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, savedResult) => {
                    if(!err)
                    console.log('data saved')
                    res.send(data)
                })
            } else {
                res.json({error: "No data"})
            }
        }
    })
})

app.listen(PORT, () => {
    console.log('server is running at port : ', PORT)
})