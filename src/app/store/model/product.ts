export class Product {
    constructor(
            public sku: string,
            public price: number,
            public pictures: string[],
            public valueUnits: number,
            public referenceMesure: string,            
            public valueName: string
        ){}
}
