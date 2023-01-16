export class ProductManager {
    name: string
    products: Product[]
    constructor(
        name: string
    ) {
        this.name = name
        this.products = []
    }
    hashCodeToInt(code: string): number {
        let numberHash = 0
        if (code.length === 0) return numberHash
        for (let i = 0; i < code.length; i++) {
            const chr = code.charCodeAt(i)
            numberHash = ((numberHash << 5) - numberHash) + chr
            numberHash = numberHash & numberHash
        }
        return numberHash & 0xffff
    }
    async addProduct(newProduct: Product) {
        const product = this.products.find(
            (prod: Product) => {
                return prod.code == newProduct.code
            }
        )
        if (product != null) {
            throw Error('Duplicate product found')
        }
        else {
            newProduct.id = this.hashCodeToInt(newProduct.code)
            this.products.push(newProduct)
        }
    }

    async getProducts(): Promise<Product[]> {
        return this.products
    }

    async getProductById(id: number) {
        const product = this.products.find(
            (prod: Product) => {
                return prod.id == id
            }
        )
        if (product == undefined) {
            throw Error('No product with this ID found')
        }
        else return product
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