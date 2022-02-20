const express = require('express')
const fs = require('fs')

const PORT = 3000
const app = express()

app.get("/fileone", async (req, res) => {
    await fs.readFile('fileone.txt', 'utf8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

app.get("/filetwo", (req, res) => { 
    fs.readFile('filetwo.txt', 'utf8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

app.listen(PORT, () => {
    console.log('sever is listing to port ', PORT)
})