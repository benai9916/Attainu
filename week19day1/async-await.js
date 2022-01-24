const product =  async () => {
    let product = await [{
        product1: 'one',
        product2: 'tow',
        product3: 'three',
    }]

    return product;
}

product().then((result) => {
    console.log(result)
})