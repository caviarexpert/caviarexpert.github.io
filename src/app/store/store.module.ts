import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { StoreComponent } from "./store.component";
import { CartDetailComponent } from "./cartdetails.component";


import { SharedModule } from "../shared/shared.module";
import { StoreRoutingModule } from "./store-routing.module";

import { ProductService } from "./product.service";
import { ProductDataSourceService } from "../datasources/product-data-source.service";
import { Cart } from "./cart.service";

import { TranslationService } from 'angular-l10n';

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        StoreRoutingModule,
        SharedModule
    ],
    declarations: [StoreComponent, CartDetailComponent],
    exports: [StoreComponent, CartDetailComponent],
    providers: [
       ProductService,
       Cart,
       ProductDataSourceService,
       //{ provide: LOCALE_ID, useValue: "ru-RU" }
    ]
})
export class StoreModule {
    constructor(private translation: TranslationService){
        this.translation.addConfiguration()
            //.addProvider('./assets/l10n/locale-countries-'); 
            .addProvider("./assets/l10n/store-");

        this.translation.init();    
    }
}