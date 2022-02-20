const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3000


app.get('/', (req, res) => {
    let data = {
        count: 1
    }

    if(fs.existsSync('count.json')) {
        fs.readFile('count.json', 'utf8', (err, data) => {
            if(!err) {
                let jsonData = JSON.parse(data)

                console.log(jsonData)

                jsonData.count += 1

                fs.writeFile('count.json', JSON.stringify(jsonData), (err, data) => {
                    if(!err)
                    console.log('Data saved')
                })

                res.status(200).send(jsonData)
            }
        })
    } else {
        fs.writeFile('count.json', JSON.stringify(data), (err, data) => {
            if(!err)
            console.log('Data saved')

            res.status(200).send({count: 1})
        })
    }
})

app.get('/reset', (req, res) => {
    let data= {
        count: 0
    }
    if(fs.existsSync('count.json')) {
        fs.writeFile('count.json', JSON.stringify(data), (err, data) => {
            if(!err)
            console.log('Data saved')

            res.status(200).send({count: 0})
        })
    }
})

app.listen(PORT, () => {
    console.log('Server is running at ', PORT)
})