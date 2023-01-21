import { ProductManager } from './api/managers/ProductManager';
import express from 'express';
import dotenv from 'dotenv';
import { safeQuery } from './utils/SafeQueryMethod';
import { CartManager } from './api/managers/CartManager';
import { Product } from './types/InventoryTypes';

dotenv.config();

const app = express();
const port = process.env.PORT;
const ProdMan = new ProductManager('database/products.txt');
const CartMan = new CartManager('database/cart.txt')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('express set up')
})


app.get('/api/products/:pid', async (req, res) => {
    try {
        let pid: number = parseInt(req.params.pid)
        let product = await ProdMan.getProductById(pid);
        res.send(`get product through id: ${pid} the product is ${JSON.stringify(product)}`)
    } catch (error) {
        res.status(404)
        res.send('no product fond with this id')
    }
})
app.get('/api/products', async (req, res) => {
    try {
        let { limit } = safeQuery(req)
        let products = await ProdMan.getProducts();
        if (limit != undefined) {
            products = products.slice(0, parseInt(limit))
        }
        res.send(`get all products with limit of ${limit}. Products: ${JSON.stringify(products)}`)
    } catch (error) {
        res.status(404)
        res.send('cannot obtain products')
    }
})

app.post('/api/products', async (req, res) => {
    try {
        let newProduct: Product = req.body;
        await ProdMan.addProduct(newProduct)
        res.status(200).send('productAdded')
    } catch (error) {
        res.status(404)
        res.send('cannot post product')
    }
})

app.put('/api/products/:pid', async (req, res) => {
    try {
        let pid: number = parseInt(req.params.pid)
        let updatedFields = req.body
        for (let usedKey in updatedFields) {
            let key = usedKey as keyof Product
            let value = updatedFields[key]
            await ProdMan.updateProduct(pid, key, value)
        }
        res.status(200).send('product should be updated')

    } catch (error) {
        res.status(404)
        res.send('cannot update the product')
    }
})

app.delete('/api/products/:pid', async (req, res) => {
    try {
        let pid: number = parseInt(req.params.pid)
        await ProdMan.deleteProduct(pid)
        res.status(200).send('product should be deleted')
    } catch (error) {
        res.status(404)
        res.send('cannot delete the product')
    }
})

app.listen(port, () => {
    console.log(`Serever is running at localhost:${port}`)
})
