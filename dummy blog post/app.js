const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



app.get('/post/:postId', (req, res) => {
    let id = req.params.postId;
    let postUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
    let commentUrl = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

    const blogPost = axios.get(postUrl);
    const blogComment = axios.get(commentUrl);

    axios.all([blogPost, blogComment])
    .then(axios.spread((...response) => {

        let post = response[0].data;
        let comment = response[1].data;

        console.log(response[0].data, response[1].data)

        res.render('pages/index', {
            post: post,
            comments: comment
        })
    }))
})


app.listen(PORT, () => {
    console.log(`server is running at: ${PORT}`)
})


