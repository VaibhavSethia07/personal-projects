const express = require('express');
const { products } = require('./data');
const app = express();

app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1><a href='/api/products'>Products</a>`);
})

app.get('/api/v1/products', (req, res) => {

    const newProducts = products.map((product) => {
        const { id, name, price } = product;
        return { id, name, price };
    })

    res.json(newProducts);
})

// Using request params Eg: `http://localhost:3000/api/v1/products/1`
app.get('/api/v1/products/:productID', (req, res) => {
    // request params are stored as objects and values are stored as string
    const { productID } = req.params;
    const singleProduct = products.find((product) => {
        return product.id === Number(productID);
    })

    if (!singleProduct)
        return res.json('Product Does Not Exist');

    res.status(200).json(singleProduct);
})

// Using request query string parameters Eg: `http://localhost:3000/api/v1/query?search=a&limit=2`
app.get('/api/v1/query', (req, res) => {

    const { search, limit } = req.query;
    let searchedProducts = [...products];

    if (search) {
        searchedProducts = searchedProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }

    if (limit) {
        searchedProducts = searchedProducts.slice(0, Number(limit));
    }

    res.status(200).json(searchedProducts);
})

app.listen(3000, (req, res) => {
    console.log('server is listening on port 3000...');
})