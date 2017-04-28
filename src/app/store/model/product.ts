export class Product {
    constructor(
            public sku: string,
            public price: number,
            public localizedName?: string,
        ){}
}
