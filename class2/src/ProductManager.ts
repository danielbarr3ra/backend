import { promises as fs } from 'fs';
import { hashCodeToInt } from './utils/ProductUtils'

export class ProductManager {
    path: string
    constructor(
        path: string
    ) {
        this.path = path
        fs.writeFile(this.path, '[]')
    }

    async addProduct(newProduct: Product) {
        const currentProducts = await this.getProducts()
        const product = currentProducts.find(
            (prod: Product) => {
                return prod.code == newProduct.code
            }
        )
        if (product != null) {
            throw Error('Duplicate product found')
        }
        else {
            newProduct.id = hashCodeToInt(newProduct.code)
            currentProducts.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(currentProducts))
        }
    }

    async getProducts(): Promise<Product[]> {
        let productsString = await fs.readFile(this.path, 'utf-8',)
        const data = JSON.parse(productsString) as Product[]
        return data

    }

    async getProductById(id: number) {
        const currentProducts = await this.getProducts();
        const product = currentProducts.find(
            (prod: Product) => {
                return prod.id == id
            }
        )
        if (product == undefined) {
            throw Error('No product with this ID found')
        }
        else return product
    }

    async updateProduct<K extends keyof Product>(id: number, key: K, newValue: Product[K]) {
        if (key == "id") {
            throw Error("You should not try to update the ID");
        }
        let updatedProduct = await this.getProductById(id)
        updatedProduct[key] = newValue

        let currentProducts = await this.getProducts();
        let index = currentProducts.findIndex((product: Product) => {
            return product.id === id
        })

        currentProducts[index] = updatedProduct;
        await fs.writeFile(this.path, JSON.stringify(currentProducts))
    }

    async deleteProduct(id: number) {
        await this.getProductById(id);
        let currentProducts = await this.getProducts();
        let index = currentProducts.findIndex((product: Product) => {
            return product.id === id
        })
        currentProducts.splice(index, 1)
        await fs.writeFile(this.path, JSON.stringify(currentProducts))

    }
}

export type Product = {
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    code: string,
    stock: number
    id?: number | null
}