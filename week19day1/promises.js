const product = new Promise((resolve, reject) => {
    let product = [{
        product1: 'one',
        product2: 'tow',
        product3: 'three',
    }]
    resolve(product)
    reject('Something went wrong')
})

product.then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
})