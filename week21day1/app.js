const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const PORT = 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


app.get('/userinfo', (req, res) => {
    let username = req.query.username
    let id = Number(req.query.id)
    let age = Number(req.query.age)

    if(fs.existsSync("user.json")) {
        fs.readFile('user.json', 'utf8', (err, result) => {
            if(!err) {
                let jsonData = JSON.parse(result)

                for (let item of jsonData.user) {
                    if(username !== undefined && !isNaN(age) && !isNaN(id)) {
                        console.log("iiid")
                        if(item.username !== username && item.age !== age && item.id !== id) {
                            return res.send(item)
                        } else {
                            return res.send([])
                        }
                    }
                    else if(item.username === username) {
                        return res.send(item)
                    }
                    else if(item.age === age) {
                        return res.send(item)
                    }
                    else if(item.id === id) {
                        return res.send(item)
                    }
                }
            }

            return res.send([])
        })
    }
})

app.post('/userinfo', (req, res) => {
    if(fs.existsSync("user.json")) {
        fs.readFile('user.json', 'utf8', (err, result) => {
            if(!err) {
                let generateId;
                let jsonData = JSON.parse(result)
                generateId = Number(jsonData.user.slice(-1)[0].id) + 1

                let finalData = req.body.user
                finalData.id = generateId
                jsonData.user.push(finalData)

                fs.writeFile('user.json', JSON.stringify(jsonData), 'utf8', (err, result) => {
                    if(!err) {
                        console.log("saved data", result)
                        res.send(finalData)
                    } else {
                        console.log("err",err)
                    }
                })
            }
        })
    }
})


app.listen(PORT, () => {
    console.log('server is listenig to port => ',PORT)
})