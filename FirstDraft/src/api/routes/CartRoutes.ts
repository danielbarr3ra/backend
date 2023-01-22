import { Router } from "express";
import { CartManager } from "../managers/CartManager";
import { safeQuery } from '../../utils/SafeQueryMethod';
import { Cart, SubCartProduct } from "../../types/InventoryTypes";
const CartRouter = Router();

const CartMan = new CartManager('database/carts.txt')

CartRouter.get('/api/carts/', async (req, res) => {
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
CartRouter.post('/api/carts/', async (req, res) => {
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

CartRouter.get('/api/carts/:cid', async (req, res) => {
    try {
        let cid: number = parseInt(req.params.cid)
        let newCart = await CartMan.getCartById(cid);
        res.send(`get product through id: ${cid} the product is ${JSON.stringify(newCart)}`)
    } catch (error) {
        res.status(404)
        res.send('no product fond with this id')
    }
})

CartRouter.post('/api/carts/:cid/product/:pid', async (req, res) => {
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

export default CartRouter