import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
//import { FormsModule } from "@angular/forms";
import { StoreComponent } from "./store.component";
import { CartDetailComponent } from "./cartdetails.component";
import { FormsModule }   from "@angular/forms";

import { SharedModule } from "../shared.module";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";

import { ProductService } from "./product.service";
import { ProductDataSourceService } from "../datasources/product-data-source.service";
import { Cart } from "./cart.service";

@NgModule({
    imports: [
        BrowserModule, 
        FormsModule,
        RouterModule,
        TranslateModule.forChild()
    ],
    declarations: [StoreComponent, CartDetailComponent],
    exports: [StoreComponent, CartDetailComponent],
    providers: [
       TranslateService,
       ProductService,
       Cart,
       ProductDataSourceService,
       //{ provide: LOCALE_ID, useValue: "ru-RU" }
    ]
})
export class StoreModule { }