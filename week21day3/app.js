const express = require('express')
const axios = require('axios')

const PORT =3000
const app = express()


app.get("/postWithComment", (req, res) => {
    let postReq = axios.get("https://jsonplaceholder.typicode.com/posts")
    let commentReq = axios.get("https://jsonplaceholder.typicode.com/comments")

    axios.all([postReq, commentReq]).then(axios.spread((...response) => {
        let post  = response[0].data
        let comment = response[1].data
        let finalData = []

        for(let i=0; i< post.length; i++) {
            finalData.push(post[i])
            let temp =[]
            for(let j=0; j< comment.length; j++) {
                if(post[i].id === comment[j].postId) {
                    temp.push(comment[j])
                }
                finalData[i]['comments'] = temp
            }
        }

        console.log(comment)
        res.send(finalData)

    }))
})


app.listen(PORT, () => {
    console.log("server is running at port: ",PORT)
})