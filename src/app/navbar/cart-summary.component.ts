import { Component } from "@angular/core";

@Component({
    selector: "cart-summary",
    moduleId: module.id,
    templateUrl: "./cart-summary.component.html"
})
export class CartSummaryComponent {
    public singleModel: string = '1';

    constructor() { }
}