import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "store",
    moduleId: module.id,
    templateUrl: "./store.component.html"
})
export class StoreComponent {
    public radioModel: string = 'Middle';
    private productList: string[] = ["Hello", "List"];

    constructor() { }

    get products(): string[] {
        return this.productList
    }
}