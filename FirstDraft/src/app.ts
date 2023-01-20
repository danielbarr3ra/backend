import { ProductManager } from './managers/ProductManager';
import express from 'express';
import dotenv from 'dotenv';
import { safeQuery } from './utils/SafeQueryMethod';

dotenv.config();

const app = express();
const port = process.env.PORT;
const globalManager = new ProductManager('database/inventory.txt');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('express set up')
})

app.get('/products/:pid', async (req, res) => {
    try {
        let pid: number = parseInt(req.params.pid)
        let product = await globalManager.getProductById(pid);
        res.send(`get product through id: ${pid} the product is ${JSON.stringify(product)}`)
    } catch (error) {
        res.status(505)
        res.send('no product fond with this id')
    }
})
app.get('/products', async (req, res) => {
    try {
        let { limit } = safeQuery(req)
        let products = await globalManager.getProducts();
        if (limit != undefined) {
            products = products.slice(0, parseInt(limit))
        }
        res.send(`get all products with limit of ${limit}. Products: ${JSON.stringify(products)}`)
    } catch (error) {
        res.status(505)
        res.send('cannot obtain products')
    }
})

app.listen(port, () => {
    console.log(`Serever is running at localhost:${port}`)
})
