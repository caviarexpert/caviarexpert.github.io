import {Component, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import { Router } from "@angular/router";

import { Cart } from "./cart.service";

/*
 * Consider using https://github.com/Caballerog/ng2-inline-editor 
 */

@Component({
    moduleId: module.id,
    selector: 'cart-details',
    templateUrl: "./cartdetails.component.html",
    styleUrls: ["./cartdetails.component.css"]
})
export class CartDetailComponent {
    @ViewChild("cartForm") form;
    constructor(public cart: Cart) { }

    ngAfterViewInit() {
        this.form.control.valueChanges
            .subscribe(values => this.validateQuantity(values));
    }

    private validateQuantity(obj:any): void{
        Object.keys(obj).forEach( key => {
                if( obj[key]!=null && obj[key]<=0 ){
                    this.cart.removeLine(key);
                } 
            });
        
    }
}