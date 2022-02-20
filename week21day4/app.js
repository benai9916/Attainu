const express =  require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/users', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            res.send(result)
        } else {
            res.status(500).send('Error')
        }
    })
})

app.get('/api/users/:id', (req, res) => {
    let id = Number(req.params.id)

    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            let data = JSON.parse(result)

            data.map((items) => {
                if(items.id === id) {
                    return res.send(items)
                }
            })
        } else {
            res.status(500).send('Error')
        }
    })
})


app.post('/api/users', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            let data = JSON.parse(result)
            data.push(req.body)

            fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, savedData) => {
                if(!err) {
                    return res.send(data)
                }
            })

        } else {
            res.status(500).send('Error')
        }
    })
})


app.put('/api/users/:id', (req, res) => {
    let id = Number(req.params.id)

    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            let data = JSON.parse(result)

            data.map((items) => {
                if(items.id ===  id) {
                    items.userId = req.body.userId
                    items.body = req.body.body
                    items.title = req.body.title
                }
            })

            fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, savedData) => {
                if(!err) {
                    return res.send(data)
                }
            })

        } else {
            res.status(500).send('Error')
        }
    })
})


app.delete('/api/users/:id', (req, res) => {
    let id = Number(req.params.id)

    console.log(id)
    
    fs.readFile('data.json', 'utf8', (err, result) => {
        if(!err) {
            let data = JSON.parse(result)

            data.map((items, index) => {
                if(items.id === id) {
                    data.splice(index, 1)
                }
            })

            fs.writeFile('data.json', JSON.stringify(data), 'utf8', (err, savedData) => {
                if(!err) {
                    return res.send(data)
                }
            })

        } else {
            res.status(500).send('Error')
        }
    })
})



app.listen(PORT, () => {
    console.log('server is listing to port : ', PORT)
})