import { promises as fs } from 'fs';
import { hashCodeToInt, hashDateToInt } from '../../utils/InventoryUtils'
import { Cart } from '../../types/InventoryTypes';

export class CartManager {
    path: string
    constructor(
        path: string
    ) {
        this.path = path
        if (!this.checkFileExists(path))
            fs.writeFile(this.path, '[]')
    }

    async checkFileExists(file: string) {
        try {
            await fs.access(file, fs.constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }

    async addCart(newCart: Cart) {
        const currentCarts = await this.getCarts()
        const Cart = currentCarts.find(
            // convert this to the products array instead ?
            (c: Cart) => {
                return c.id == newCart.id
            }
        )
        if (Cart != null) {
            throw Error('Duplicate Cart found')
        }
        else {
            newCart.id = hashDateToInt()
            currentCarts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(currentCarts))
        }
    }

    async getCarts(): Promise<Cart[]> {
        let CartsString = await fs.readFile(this.path, 'utf-8',)
        const data = JSON.parse(CartsString) as Cart[]
        return data

    }

    async getCartById(id: number) {
        const currentCarts = await this.getCarts();
        const Cart = currentCarts.find(
            (c: Cart) => {
                return c.id == id
            }
        )
        if (Cart == undefined) {
            throw Error('No Cart wit§h this ID found')
        }
        else return Cart
    }

    async updateCart<K extends keyof Cart>(id: number, key: K, newValue: Cart[K]) {
        if (key == "id") {
            throw Error("You should not try to update the ID");
        }
        let updatedCart = await this.getCartById(id)
        updatedCart[key] = newValue

        let currentCarts = await this.getCarts();
        let index = currentCarts.findIndex((Cart: Cart) => {
            return Cart.id === id
        })

        currentCarts[index] = updatedCart;
        await fs.writeFile(this.path, JSON.stringify(currentCarts))
    }

    async deleteCart(id: number) {
        await this.getCartById(id);
        let currentCarts = await this.getCarts();
        let index = currentCarts.findIndex((Cart: Cart) => {
            return Cart.id === id
        })
        currentCarts.splice(index, 1)
        await fs.writeFile(this.path, JSON.stringify(currentCarts))

    }

    async deleteAllCarts() {
        await fs.writeFile(this.path, JSON.stringify([]))
    }
}
