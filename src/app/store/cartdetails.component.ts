import { Component } from "@angular/core";
import { Cart } from "./cart.service";
import { Router } from "@angular/router";
/*
 * Consider using https://github.com/Caballerog/ng2-inline-editor 
 */

@Component({
    moduleId: module.id,
    templateUrl: "./cartdetails.component.html",
    styleUrls: ["./cartdetails.component.css"]
})
export class CartDetailComponent {

    constructor(public cart: Cart) { }
}