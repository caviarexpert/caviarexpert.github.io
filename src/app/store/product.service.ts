import { Injectable } from '@angular/core';
import { Product } from "./model/product";
import { ProductDataSourceService } from "../datasources/product-data-source.service"

@Injectable()
export class ProductService {
    
    private productsArray: Product[] = [];

    constructor(private productDataSource: ProductDataSourceService) {
        productDataSource.getProducts().subscribe( data => {
            this.productsArray = data;
        });
    }
    
    get products():Product[] {
        return this.productsArray;
    }

}
