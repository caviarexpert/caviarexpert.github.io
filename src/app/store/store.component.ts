//import { Component, Inject, OnInit } from "@angular/core";
//import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { Product } from "./model/product";
import { Cart } from "./cart.service";

import {
    Language,
    DefaultLocale,
    Currency
} from 'angular-l10n';

@Component({
    selector: "store-area",
    moduleId: module.id,
    templateUrl: "./store.component.html"
})
export class StoreComponent implements OnInit {

    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;
    @Currency() currency: string;

    constructor(private cart: Cart, private productService: ProductService){}
    
    ngOnInit():void {
        /*
        this.translateService.setTranslation("en", {
            STORE: {
                addToCart: "buy",
                PRODUCTS: {
                    salmon_cav_200g: "Salmon caviar, 200g",
                    salmon_keta_cav_200g: "Salmon caviar (Keta), 200g"
                },
                valueNames: {
                    net_weight: "net weight"
                }
            }
        });
        this.translateService.setTranslation("es", {
            STORE: {
                addToCart: "comprar",
                PRODUCTS: {
                    salmon_cav_200g: "Cavile de salmone, 200g",
                    salmon_keta_cav_200g: "Caviale de salmone (Keta), 200g"
                },
                valueNames: {
                    net_weight: "peso neto"
                }
            }
        });
        this.translateService.setTranslation("ru", {
            STORE: {
                addToCart: "купить",
                PRODUCTS: {
                    salmon_cav_200g: "Икра лососевая, 200 грамм",
                    salmon_keta_cav_200g: "Икра красная (кета), 200 грамм"
                },
                valueNames: {
                    net_weight: "вес нетто"
                }
            }
        });
        this.translateService.setTranslation("it", {
            STORE: {
                addToCart: "comprare",
                PRODUCTS: {
                    salmon_cav_200g: "Uova di pesce (salmone), 200g",
                    salmon_keta_cav_200g: "Uova di pesce (salmone, Keta), 200g"

                }
            }
        });
        this.translateService.setTranslation("fr", {
            STORE: {
                addToCart: "acheter",
                PRODUCTS: {
                    salmon_cav_200g: "œufs de saumon, 200g",
                    salmon_keta_cav_200g: "œufs de saumon (Keta), 200g"

                }
            }
        });
        this.translateService.setTranslation("de", {
            STORE: {
                addToCart: "kaufen",
                PRODUCTS: {
                    salmon_cav_200g: "Lachskaviar, 200g",
                    salmon_keta_cav_200g: "Lachskaviar (Keta), 200g"
                }
            }
        });
        */
    }

    get products(): Product[] {
        return this.productService.products;
    }

    addProductToCart(product: Product) {
       this.cart.addLine(product);
    }

    cartPrice():number{
        return this.cart.totalCartPrice;
    }
    itemsInCart(product : Product): number {
        return this.cart.lines.filter( line => line.product.sku == product.sku)
            .map ( line => line.quantity)
            .reduce( (last, current) => last + current, 0);
    }
}