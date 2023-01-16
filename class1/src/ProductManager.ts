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
        let numberHash: number = 0;
        if (code.length === 0) return numberHash;
        for (let i = 0; i < code.length; i++) {
            let chr = code.charCodeAt(i)
            numberHash = ((numberHash << 5) - numberHash) + chr
            numberHash = numberHash & numberHash
        }
        return numberHash & 0xffff;
    }
    async addProduct(newProduct: Product): Promise<never> {
        if (this.products.some((product: Product) => {
            product.code === newProduct.code
        })) {
            newProduct.id = this.hashCodeToInt(newProduct.code)
            this.products.push(newProduct);
            return
        } else {
            throw TypeError('No Product Found')
        }
    }

    async getProducts(): Promise<Product[]> {
        return this.products;
    }

    async getProductById(id: number): Promise<Product> {
        return this.products.find((product: Product) => {
            product.id === id;
        })

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