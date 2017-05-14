import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import { Router } from "@angular/router";

import { Cart } from "./cart.service";

import {
    Language,
    DefaultLocale,
    Currency
} from 'angular-l10n';

/*
 * Consider using https://github.com/Caballerog/ng2-inline-editor 
 */

@Component({
    moduleId: module.id,
    selector: 'cart-details',
    templateUrl: "./cartdetails.component.html",
    styleUrls: ["./cartdetails.component.css"]
})
export class CartDetailComponent implements OnInit, OnDestroy {
    @Language() lang: string;
    @DefaultLocale() defaultLocale: string;
    @Currency() currency: string;

    @ViewChild("cartForm") form;
    constructor(public cart: Cart) { }

    ngAfterViewInit() {
        this.form.control.valueChanges
            .subscribe(values => this.validateQuantity(values));
    }
    ngOnInit() : void {}
    ngOnDestroy(): void {}

    private validateQuantity(obj:any): void{
        Object.keys(obj).forEach( key => {
                
                if(obj[key]!=null && !isNaN(obj[key])){
                    if( obj[key]<=0 ){
                        this.cart.removeLine(key);
                        return;
                    }else if ( !Number.isInteger(obj[key] )){
                        this.cart.lines.filter( line => line.product.sku == key)
                            .forEach( line => line.quantity = Math.round( obj[key] ));
                        return;
                    }else return;
                }
                if( obj[key]=="") return;
                let newVal = parseFloat(obj[key]);
                if(!isNaN(newVal)){
                    this.cart.lines.filter( line => line.product.sku == key)
                            .forEach( line => line.quantity = newVal );
                }
            });
        
    }
}