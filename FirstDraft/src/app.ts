import { ProductManager } from './api/managers/ProductManager';
import express from 'express';
import dotenv from 'dotenv';
import { safeQuery } from './utils/SafeQueryMethod';
import { CartManager } from './api/managers/CartManager';
import { Cart, Product, SubCartProduct } from './types/InventoryTypes';

dotenv.config();

const app = express();
const port = process.env.PORT;
const ProdMan = new ProductManager('database/products.txt');
const CartMan = new CartManager('database/carts.txt')

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

app.get('/api/carts/', async (req, res) => {
    try {
        let { limit } = safeQuery(req)
        let carts = await CartMan.getCarts();
        if (limit != undefined) {
            carts = carts.slice(0, parseInt(limit))
        }
        res.send(`get all carts with limit of ${limit}. Products: ${JSON.stringify(carts)}`)
    } catch (error) {
        res.status(404)
        res.send('cannot obtain carts')
    }
})
app.post('/api/carts/', async (req, res) => {
    try {
        let newCart: Cart = req.body;
        await CartMan.addCart(newCart)
        res.status(200).send('cart added')
    } catch (error) {
        console.log(error)
        res.status(404)
        res.send('cannot add cart')
    }
})

app.get('/api/carts/:cid', async (req, res) => {
    try {
        let cid: number = parseInt(req.params.cid)
        let newCart = await CartMan.getCartById(cid);
        res.send(`get product through id: ${cid} the product is ${JSON.stringify(newCart)}`)
    } catch (error) {
        res.status(404)
        res.send('no product fond with this id')
    }
})

app.post('/api/carts/:cid/product/:pid', async (req, res) => {
    try {
        let cid: number = parseInt(req.params.cid);
        let pid: number = parseInt(req.params.pid);
        let cart: Cart = await CartMan.getCartById(cid);
        let products = cart.products;
        for (let p of products) {
            if (pid === p.id) {
                p.quantity += 1;
                await CartMan.updateCart(cid, 'products', products)
                res.status(200).send('udpated the cart')
                return
            }
        }
        // I think this should be a put statment tho
        products.push({
            id: pid,
            quantity: 1
        })

        await CartMan.updateCart(cid, 'products', products)

        res.status(200).send('udpated the cart')
    } catch (error) {
        res.status(404)
        res.send('Cannot find product')
    }
})

app.listen(port, () => {
    console.log(`Serever is running at localhost:${port}`)
})
