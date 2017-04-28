import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {TranslateService } from "@ngx-translate/core";
import { ProductService } from "./product.service";
import { Product } from "./model/product";

@Component({
    selector: "store-area",
    moduleId: module.id,
    templateUrl: "./store.component.html"
})
export class StoreComponent implements OnInit {
    public radioModel: string = 'Middle';
    private productList: string[] = ["Hello", "List"];

    constructor(private translateService: TranslateService,
            private productService: ProductService){}
    
    ngOnInit(){
        this.translateService.setTranslation("en", {
            STORE: {
                addToCart: "buy",
                PRODUCTS: {
                    salmon_cav_200g: "Salmon caviar, 200g"
                }
            }
        });
        this.translateService.setTranslation("es", {
            STORE: {
                addToCart: "comprar",
                PRODUCTS: {
                    salmon_cav_200g: "Cavile de salmone, 200g"
                }
            }
        });
        this.translateService.setTranslation("ru", {
            STORE: {
                addToCart: "купить",
                PRODUCTS: {
                    salmon_cav_200g: "Икра лососевая (кета), 200 г."
                }
            }
        });
    }

    get products(): Product[] {
        return this.productService.products;
    }

    get translate(): TranslateService {
        return this.translateService;
    }
}