const getJoke = async () => {
    let data = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json"
        }
    }).then(res => {
        return res.json()
    })

    document.getElementById('joke').innerHTML = data.joke
}

getJoke()