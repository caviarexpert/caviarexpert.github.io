/// <reference path="../html.d.ts" />
import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";
import  * as template from "./cart-summary.component.html";

@Component({
    selector: "cart-summary",
    moduleId: module.id,
    //templateUrl: "./cart-summary.component.html"
    template: template + ''
})
export class CartSummaryComponent {

    constructor(public cart: Cart) { }
}